import db from '../db.js';

export const getAll = (req, res) => {
    const rows = db.prepare('SELECT * FROM studios ORDER BY sort_order, id').all();
    res.json(rows.map(r => ({ ...r, styles: JSON.parse(r.styles || '[]') })));
};

export const create = (req, res) => {
    const b = req.body;
    const result = db.prepare('INSERT INTO studios (name, address_en, address_fr, styles, rating, reviews, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
        b.name || '', b.address_en || '', b.address_fr || '', JSON.stringify(b.styles || []), b.rating || 0, b.reviews || 0, b.image_url || '', b.sort_order || 0
    );
    res.json({ id: result.lastInsertRowid });
};

export const update = (req, res) => {
    const b = req.body;
    db.prepare('UPDATE studios SET name=?, address_en=?, address_fr=?, styles=?, rating=?, reviews=?, image_url=?, sort_order=? WHERE id=?').run(
        b.name || '', b.address_en || '', b.address_fr || '', JSON.stringify(b.styles || []), b.rating || 0, b.reviews || 0, b.image_url || '', b.sort_order || 0, req.params.id
    );
    res.json({ success: true });
};

export const remove = (req, res) => {
    db.prepare('DELETE FROM studios WHERE id = ?').run(req.params.id);
    res.json({ success: true });
};
