import db from '../db.js';

// Add value_es column if it doesn't exist yet (migration for existing DBs)
try {
    db.prepare("SELECT value_es FROM site_content LIMIT 1").get();
} catch {
    db.exec("ALTER TABLE site_content ADD COLUMN value_es TEXT NOT NULL DEFAULT ''");
    console.log('✅ Added value_es column to site_content');
}

export const getAll = (req, res) => {
    const rows = db.prepare('SELECT * FROM site_content ORDER BY page, section, content_key').all();
    res.json(rows);
};

export const getByPage = (req, res) => {
    const rows = db.prepare('SELECT * FROM site_content WHERE page = ? ORDER BY section, content_key').all(req.params.page);
    res.json(rows);
};

export const upsert = (req, res) => {
    const { page, section, content_key, value_en, value_fr, value_es } = req.body;
    if (!page || !section || !content_key) {
        return res.status(400).json({ error: 'page, section, and content_key are required' });
    }
    db.prepare(`INSERT INTO site_content (page, section, content_key, value_en, value_fr, value_es) 
    VALUES (?, ?, ?, ?, ?, ?) 
    ON CONFLICT(page, section, content_key) 
    DO UPDATE SET value_en = excluded.value_en, value_fr = excluded.value_fr, value_es = excluded.value_es`
    ).run(page, section, content_key, value_en || '', value_fr || '', value_es || '');
    res.json({ success: true });
};

export const bulkUpdate = (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'items array required' });
    const stmt = db.prepare(`INSERT INTO site_content (page, section, content_key, value_en, value_fr, value_es) 
    VALUES (?, ?, ?, ?, ?, ?) 
    ON CONFLICT(page, section, content_key) 
    DO UPDATE SET value_en = excluded.value_en, value_fr = excluded.value_fr, value_es = excluded.value_es`);
    const tx = db.transaction(() => {
        for (const item of items) {
            stmt.run(item.page, item.section, item.content_key, item.value_en || '', item.value_fr || '', item.value_es || '');
        }
    });
    tx();
    res.json({ success: true, count: items.length });
};
