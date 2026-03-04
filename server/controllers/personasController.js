import db from '../db.js';

export const getAll = (req, res) => {
    const rows = db.prepare('SELECT * FROM personas ORDER BY sort_order, id').all();
    res.json(rows.map(r => ({ ...r, features: JSON.parse(r.features || '[]'), plans: JSON.parse(r.plans || '[]') })));
};

export const update = (req, res) => {
    const b = req.body;
    db.prepare('UPDATE personas SET title_en=?, title_fr=?, desc_en=?, desc_fr=?, image_url=?, features=?, plans=?, sort_order=? WHERE id=?').run(
        b.title_en || '', b.title_fr || '', b.desc_en || '', b.desc_fr || '', b.image_url || '', JSON.stringify(b.features || []), JSON.stringify(b.plans || []), b.sort_order || 0, req.params.id
    );
    res.json({ success: true });
};
