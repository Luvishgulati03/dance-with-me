import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import DB (triggers table creation + seeding)
import './db.js';

// Import routes
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import eventsRoutes from './routes/events.js';
import studiosRoutes from './routes/studios.js';
import plansRoutes from './routes/plans.js';
import faqsRoutes from './routes/faqs.js';
import featuresRoutes from './routes/features.js';
import personasRoutes from './routes/personas.js';
import uploadRoutes from './routes/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/studios', studiosRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/upload', uploadRoutes);

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('{*path}', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
