import db from '../db.js';

export const getAll = (req, res) => {
    const rows = db.prepare('SELECT * FROM events ORDER BY sort_order, id').all();
    res.json(rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]'), featured: !!r.featured })));
};

export const getById = (req, res) => {
    const row = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json({ ...row, tags: JSON.parse(row.tags || '[]'), featured: !!row.featured });
};

export const create = (req, res) => {
    const b = req.body;
    const result = db.prepare(`INSERT INTO events (title_en, title_fr, date, time, location_en, location_fr, category, event_type, description_en, description_fr, full_description_en, full_description_fr, tags, attendees, featured, image_url, video_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        b.title_en || '', b.title_fr || '', b.date || '', b.time || '', b.location_en || '', b.location_fr || '', b.category || 'Festival', b.event_type || 'organiser', b.description_en || '', b.description_fr || '', b.full_description_en || '', b.full_description_fr || '', JSON.stringify(b.tags || []), b.attendees || '', b.featured ? 1 : 0, b.image_url || '', b.video_url || '', b.sort_order || 0
    );
    res.json({ id: result.lastInsertRowid });
};

export const update = (req, res) => {
    const b = req.body;
    db.prepare(`UPDATE events SET title_en=?, title_fr=?, date=?, time=?, location_en=?, location_fr=?, category=?, event_type=?, description_en=?, description_fr=?, full_description_en=?, full_description_fr=?, tags=?, attendees=?, featured=?, image_url=?, video_url=?, sort_order=? WHERE id=?`).run(
        b.title_en || '', b.title_fr || '', b.date || '', b.time || '', b.location_en || '', b.location_fr || '', b.category || 'Festival', b.event_type || 'organiser', b.description_en || '', b.description_fr || '', b.full_description_en || '', b.full_description_fr || '', JSON.stringify(b.tags || []), b.attendees || '', b.featured ? 1 : 0, b.image_url || '', b.video_url || '', b.sort_order || 0, req.params.id
    );
    res.json({ success: true });
};

export const remove = (req, res) => {
    db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
    res.json({ success: true });
};
