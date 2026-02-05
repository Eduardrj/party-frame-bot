// Minimal webhook handler patch for welcome logic
const express = require('express');
const router = express.Router();
const db = require('./db');
const axios = require('axios');

// helper to get current active event
async function getCurrentEvent() {
  const row = await db.query("SELECT id, name, welcome_message FROM events WHERE status='OPEN' ORDER BY id DESC LIMIT 1");
  return row.rows[0] || null;
}

// send whatsapp reply helper (using WhatsApp Cloud API)
async function sendWhatsAppMessage(to, text) {
  const token = process.env.WHATSAPP_TOKEN;
  if (!token) return;
  const url = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
  try {
    await axios.post(url, {
      messaging_product: 'whatsapp',
      to,
      text: { body: text }
    }, { headers: { Authorization: `Bearer ${token}` } });
  } catch (e) { console.error('whatsapp send error', e.message); }
}

router.post('/webhook/whatsapp', express.json(), async (req, res) => {
  // basic validation omitted - implement verify token if required
  const event = await getCurrentEvent();
  if (!event) {
    // reply that no active event
    // extract phone from payload (simplified)
    const from = req.body?.from || null;
    if (from) await sendWhatsAppMessage(from, 'No active event. Por favor tente novamente mais tarde.');
    return res.sendStatus(200);
  }

  // parse incoming - simplified
  const from = req.body?.from || req.body?.contacts?.[0]?.wa_id || null;
  if (!from) return res.sendStatus(200);

  // mark participant
  try {
    await db.query('INSERT INTO participants(event_id, whatsapp_user, welcome_sent, first_seen_at) VALUES($1,$2,false,now()) ON CONFLICT (event_id, whatsapp_user) DO NOTHING', [event.id, from]);
    const p = await db.query('SELECT welcome_sent FROM participants WHERE event_id=$1 AND whatsapp_user=$2', [event.id, from]);
    const welcomeSent = p.rows[0] ? p.rows[0].welcome_sent : false;
    if (!welcomeSent) {
      const msg = event.welcome_message || `Você está enviando fotos para a festa ${event.name}. Cada foto será salva com a moldura oficial e você pode salvar e compartilhar aqui mesmo.`;
      await sendWhatsAppMessage(from, msg);
      await db.query('UPDATE participants SET welcome_sent=true WHERE event_id=$1 AND whatsapp_user=$2', [event.id, from]);
    }
  } catch (err) {
    console.error('participant error', err.message);
  }

  // proceed with existing media handling (stubbed)
  // if media present, enqueue processing job (not implemented here)

  res.sendStatus(200);
});

module.exports = router;
