require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
});

// Test DB Connection
pool.connect()
    .then(client => {
        console.log('PostgreSQL Connected Successfully');
        client.release();
    })
    .catch(err => {
        console.error('Database connection error:', err.stack);
    });

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/client/dashboard', async (req, res) => {
    const { clientId } = req.query;

    const statsQuery = `
        SELECT
            COUNT(*)::int AS total_requests,
            COUNT(*) FILTER (WHERE status IN ('In Progress', 'Pending Verification', 'Processing'))::int AS in_progress,
            COUNT(*) FILTER (WHERE status IN ('Completed', 'Approved'))::int AS completed,
            COUNT(*) FILTER (WHERE status IN ('Action Required', 'Rejected'))::int AS action_needed
        FROM client_applications
        WHERE ($1::text IS NULL OR client_id = $1);
    `;

    const applicationsQuery = `
        SELECT
            id,
            reference_id,
            request_type,
            submitted_on,
            status,
            progress
        FROM client_applications
        WHERE ($1::text IS NULL OR client_id = $1)
        ORDER BY submitted_on DESC
        LIMIT 50;
    `;

    try {
        const statsResult = await pool.query(statsQuery, [clientId || null]);
        const appsResult = await pool.query(applicationsQuery, [clientId || null]);

        res.json({
            stats: statsResult.rows[0],
            applications: appsResult.rows
        });
    } catch (err) {
        console.error('Dashboard query error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/client/uploads', upload.array('documents', 10), (req, res) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return res.status(500).json({ error: 'Cloudinary is not configured.' });
    }

    const uploads = (req.files || []).map(file => (
        new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: process.env.CLOUDINARY_FOLDER || 'probate/uploads',
                    resource_type: 'auto',
                    use_filename: true,
                    unique_filename: true
                },
                (err, result) => {
                    if (err) return reject(err);
                    resolve({
                        originalName: file.originalname,
                        storedName: result.public_id,
                        size: file.size,
                        mimeType: file.mimetype,
                        url: result.secure_url
                    });
                }
            );
            uploadStream.end(file.buffer);
        })
    ));

    Promise.all(uploads)
        .then(files => res.json({ files }))
        .catch(err => {
            console.error('Upload error:', err);
            res.status(500).json({ error: 'Upload failed' });
        });
});

function generateCaseCode() {
    const suffix = Math.floor(10000 + Math.random() * 90000);
    return `PHC/B${suffix}/FRIS`;
}

app.post('/api/client/submit', async (req, res) => {
    const caseCode = generateCaseCode();
    const requestType = req.body?.requestType || 'Probate Transmission';
    const clientName = req.body?.clientName || 'Client';
    const status = 'Sent to Probate Officer';

    try {
        await pool.query(
            `INSERT INTO client_applications (reference_id, request_type, submitted_on, status, progress, client_name)
             VALUES ($1, $2, CURRENT_DATE, $3, $4, $5)`,
            [caseCode, requestType, status, 0, clientName]
        );
        res.json({ caseCode, status });
    } catch (err) {
        console.error('Submit error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/officer/requests', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, reference_id, request_type, status, client_name, submitted_on, progress
             FROM client_applications
             ORDER BY submitted_on DESC
             LIMIT 50;`
        );
        res.json({ requests: result.rows });
    } catch (err) {
        console.error('Officer requests error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/db-test', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.json({ message: 'DB Connection Successful', time: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
