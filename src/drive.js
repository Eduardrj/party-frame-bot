// Minimal Google Drive helper (uses googleapis)
const {google} = require('googleapis');
const fs = require('fs');

function authClient() {
  const keyPath = process.env.SERVICE_ACCOUNT_JSON_PATH;
  if (!keyPath || !fs.existsSync(keyPath)) throw new Error('SERVICE_ACCOUNT_JSON_PATH not set or file missing');
  const key = require(keyPath);
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive']
  );
  return jwtClient;
}

async function uploadBuffer(buffer, name, folderId) {
  const auth = authClient();
  const drive = google.drive({version: 'v3', auth});
  const res = await drive.files.create({
    requestBody: {
      name,
      parents: folderId ? [folderId] : undefined,
    },
    media: {
      mimeType: 'image/png',
      body: Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer),
    },
    fields: 'id, webViewLink, webContentLink'
  });
  return res.data;
}

module.exports = { uploadBuffer };
