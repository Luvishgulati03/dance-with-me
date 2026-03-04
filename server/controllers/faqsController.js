import db from '../db.js';

export const getAll = (req, res) => {
    res.json(db.prepare('SELECT * FROM faqs ORDER BY sort_order, id').all());
};

export const create = (req, res) => {
    const b = req.body;
    const result = db.prepare('INSERT INTO faqs (question_en, question_fr, answer_en, answer_fr, sort_order) VALUES (?, ?, ?, ?, ?)').run(
        b.question_en || '', b.question_fr || '', b.answer_en || '', b.answer_fr || '', b.sort_order || 0
    );
    res.json({ id: result.lastInsertRowid });
};

export const update = (req, res) => {
    const b = req.body;
    db.prepare('UPDATE faqs SET question_en=?, question_fr=?, answer_en=?, answer_fr=?, sort_order=? WHERE id=?').run(
        b.question_en || '', b.question_fr || '', b.answer_en || '', b.answer_fr || '', b.sort_order || 0, req.params.id
    );
    res.json({ success: true });
};

export const remove = (req, res) => {
    db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
    res.json({ success: true });
};
