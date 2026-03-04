import db from '../db.js';

export const getAll = (req, res) => {
    res.json(db.prepare('SELECT * FROM features ORDER BY sort_order, id').all());
};

export const update = (req, res) => {
    const b = req.body;
    db.prepare('UPDATE features SET title_en=?, title_fr=?, subtitle_en=?, subtitle_fr=?, desc_en=?, desc_fr=?, image_url=?, video_url=?, sort_order=? WHERE id=?').run(
        b.title_en || '', b.title_fr || '', b.subtitle_en || '', b.subtitle_fr || '', b.desc_en || '', b.desc_fr || '', b.image_url || '', b.video_url || '', b.sort_order || 0, req.params.id
    );
    res.json({ success: true });
};
