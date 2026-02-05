// Minimal admin endpoints for events
const express = require('express');
const router = express.Router();
const { genZipAndUpload } = require('./jobs/genzip');
// db helper placeholder - adapt to your project's DB layer
const db = require('./db');

// close event
router.post('/events/:id/close', async (req, res) => {
  const id = req.params.id;
  await db.query('UPDATE events SET status=$1 WHERE id=$2', ['CLOSED', id]);
  res.json({ ok: true, event: id });
});

// enqueue genzip (synchronous minimal)
router.post('/events/:id/genzip', async (req, res) => {
  const id = req.params.id;
  // fetch files list from db or drive - here we assume DB has records with drive_file_id and name
  const rows = await db.query('SELECT name, drive_file_id_raw FROM photos WHERE event_id=$1', [id]);
  // placeholder: download buffers from drive by id - implement drive download
  const files = rows.rows.map(r => ({ name: r.name || `${r.drive_file_id_raw}.jpg`, buffer: Buffer.from('') }));
  try {
    const uploaded = await genZipAndUpload(id, files);
    res.json({ ok: true, upload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'genzip failed' });
  }
});

// stats endpoint
router.get('/events/:id/stats', async (req, res) => {
  const id = req.params.id;
  const photosToday = (await db.query("SELECT count(*) FROM photos WHERE event_id=$1 AND created_at >= current_date", [id])).rows[0].count;
  const uniqueGuests = (await db.query("SELECT count(DISTINCT whatsapp_user) FROM photos WHERE event_id=$1 AND created_at >= current_date", [id])).rows[0].count;
  const avgPerGuest = uniqueGuests > 0 ? photosToday / uniqueGuests : 0;
  res.json({ photosToday: Number(photosToday), uniqueGuests: Number(uniqueGuests), avgPerGuest });
});

module.exports = router;
