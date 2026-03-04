import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp|svg|mp4|webm/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) return cb(null, true);
        cb(new Error('Only images and videos are allowed'));
    },
});

export const uploadFile = (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
};

export const deleteFile = (req, res) => {
    const filepath = path.join(uploadsDir, req.params.filename);
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
    res.json({ success: true });
};

export const getAllMedia = (req, res) => {
    res.json(db.prepare('SELECT * FROM media ORDER BY id').all());
};

export const updateMedia = (req, res) => {
    const { url, type, context } = req.body;
    db.prepare('UPDATE media SET url=?, type=?, context=? WHERE id=?').run(url || '', type || 'image', context || '', req.params.id);
    res.json({ success: true });
};

export const createMedia = (req, res) => {
    const { url, type, context } = req.body;
    const result = db.prepare('INSERT INTO media (url, type, context) VALUES (?, ?, ?)').run(url || '', type || 'image', context || '');
    res.json({ id: result.lastInsertRowid });
};

export const deleteMedia = (req, res) => {
    db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id);
    res.json({ success: true });
};
