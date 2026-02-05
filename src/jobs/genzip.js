// Minimal genzip worker
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { uploadBuffer } = require('../src/drive');

async function genZipAndUpload(eventId, files) {
  // files: array of {name, buffer}
  const tmpFile = `/tmp/event_${eventId}_photos.zip`;
  const output = fs.createWriteStream(tmpFile);
  const archive = archiver('zip', { zlib: { level: 9 } });
  return new Promise((resolve, reject) => {
    output.on('close', async () => {
      try {
        const data = fs.readFileSync(tmpFile);
        // upload to Drive under folder (use DRIVE_ROOT_FOLDER_ID/eventId if desired)
        const folderId = process.env.DRIVE_ROOT_FOLDER_ID || null;
        const upload = await uploadBuffer(data, `event_${eventId}_photos.zip`, folderId);
        fs.unlinkSync(tmpFile);
        resolve(upload);
      } catch (err) {
        reject(err);
      }
    });
    archive.on('error', (err) => reject(err));
    archive.pipe(output);
    files.forEach(f => archive.append(f.buffer, { name: f.name }));
    archive.finalize();
  });
}

module.exports = { genZipAndUpload };
