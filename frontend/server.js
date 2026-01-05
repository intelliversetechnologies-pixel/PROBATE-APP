import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = '127.0.0.1';

// COMPLETE MIME TYPES
const MIMES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
};

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

console.log('Starting server...');

const server = http.createServer((req, res) => {
    console.log(`REQ: ${req.url}`);

    // Normalize path
    let safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');

    let filePath = path.join(__dirname, 'dist', safePath === '/' ? 'index.html' : safePath);

    // If no extension, assume SPA route and serve index.html
    // BUT only if we are not looking for a file that actually exists
    if (!path.extname(filePath)) {
        filePath = path.join(__dirname, 'dist', 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIMES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Try fallback to index.html if we were looking for a specific file but didn't find it
                // This handles deep links like /client/new
                fs.readFile(path.join(__dirname, 'dist', 'index.html'), (e, index) => {
                    if (e) {
                        res.writeHead(404);
                        res.end('Not found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(index);
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, HOST, (err) => {
    if (err) {
        console.error('Listen error:', err);
    } else {
        console.log(`Server running at http://${HOST}:${PORT}/`);
    }
});
