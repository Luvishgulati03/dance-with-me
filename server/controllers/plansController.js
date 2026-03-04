import db from '../db.js';

export const getAll = (req, res) => {
    const rows = db.prepare('SELECT * FROM plans ORDER BY sort_order, id').all();
    res.json(rows.map(r => ({ ...r, is_popular: !!r.is_popular })));
};

export const update = (req, res) => {
    const b = req.body;
    db.prepare('UPDATE plans SET name=?, price=?, perfect_for_en=?, perfect_for_fr=?, available_on=?, features_en=?, features_fr=?, is_popular=?, sort_order=? WHERE id=?').run(
        b.name || '', b.price || '', b.perfect_for_en || '', b.perfect_for_fr || '', b.available_on || '', b.features_en || '', b.features_fr || '', b.is_popular ? 1 : 0, b.sort_order || 0, req.params.id
    );
    res.json({ success: true });
};
