import 'dotenv/config';
import http from 'node:http';
import crypto from 'node:crypto';
import express from 'express';
import { MongoClient } from 'mongodb';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
const DB_NAME = process.env.MONGO_DB || 'probatedb';

// Simple, consistent logger
const ts = () => new Date().toISOString();
const log = (...args) => console.log(`[server ${ts()}]`, ...args);
const warn = (...args) => console.warn(`[server ${ts()}]`, ...args);
const error = (...args) => console.error(`[server ${ts()}]`, ...args);

const redactMongo = (uri) => {
  try {
    const u = new URL(uri);
    const host = u.host; // includes hostname + port if any
    const db = u.pathname && u.pathname !== '/' ? u.pathname.slice(1) : '(none)';
    return { scheme: u.protocol.replace(':', ''), host, db, options: u.search }; 
  } catch {
    return null;
  }
};

const summarizeMongoError = (err) => ({
  name: err?.name,
  code: err?.code,
  codeName: err?.codeName,
  labels: err?.errorLabels,
  message: err?.message,
});

if (!MONGO_URI) {
  // eslint-disable-next-line no-console
  console.warn('[server] MONGO_URI not set. Set env var before running.');
}

// Helper: hash password using Node crypto (PBKDF2)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash, algo: 'pbkdf2', iter: 100000, keylen: 64, digest: 'sha512' };
}

async function main() {
  const app = express();
  app.use(express.json());

  // Connect Mongo (with guards)
  let dbReady = false;
  let dbError = null;
  let clients;
  let client;
  const info = redactMongo(MONGO_URI);
  if (!MONGO_URI) {
    warn('MONGO_URI not set. API will report 500 until configured.');
  } else {
    log('Attempting Mongo connect', info ? `(host: ${info.host}, db: ${DB_NAME})` : '');
    try {
      client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 7000 });
      await client.connect();
      const db = client.db(DB_NAME);
      // Quick ping to verify server selection/auth
      await db.command({ ping: 1 });
      clients = db.collection('clients');
      await clients.createIndex({ email: 1 }, { unique: true, sparse: true });
      await clients.createIndex({ phone: 1 }, { unique: true, sparse: true });
      dbReady = true;
      dbError = null;
      log('Mongo connected', info ? `(host: ${info.host}, db: ${DB_NAME})` : '');
    } catch (e) {
      dbReady = false;
      dbError = summarizeMongoError(e);
      error('Mongo connection failed', dbError);
    }
  }

  // Health
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, dbReady, db: DB_NAME, error: dbReady ? null : dbError });
  });

  // If DB not connected, short-circuit API requests (except health)
  app.use((req, res, next) => {
    if (!dbReady) {
      return res.status(500).json({ error: 'Database not configured or connected' });
    }
    return next();
  });

  // Signup endpoint
  app.post('/api/clients', async (req, res) => {
    try {
      const { firstName, middleName, lastName, phone, password, email } = req.body || {};
      if (!firstName || !lastName || !phone || !password) {
        return res.status(400).json({ error: 'firstName, lastName, phone, and password are required' });
      }

      const { salt, hash, algo, iter, keylen, digest } = hashPassword(password);
      const doc = {
        firstName: String(firstName).trim(),
        middleName: middleName ? String(middleName).trim() : '',
        lastName: String(lastName).trim(),
        fullName: [firstName, middleName, lastName].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim(),
        phone: String(phone).trim(),
        email: email ? String(email).toLowerCase().trim() : undefined,
        password: { salt, hash, algo, iter, keylen, digest },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await clients.insertOne(doc);
      return res.status(201).json({ ok: true });
    } catch (err) {
      if (err && err.code === 11000) {
        const key = Object.keys(err.keyPattern || {})[0] || 'unique field';
        return res.status(409).json({ error: `${key} already exists` });
      }
      error('[signup] error', summarizeMongoError(err));
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const server = http.createServer(app);
  server.listen(PORT, () => {
    log(`listening on http://localhost:${PORT} (db: ${DB_NAME})`);
  });

  // Global safety nets
  process.on('unhandledRejection', (reason) => error('unhandledRejection', reason));
  process.on('uncaughtException', (err) => error('uncaughtException', err));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[server] failed to start', err);
  process.exit(1);
});
