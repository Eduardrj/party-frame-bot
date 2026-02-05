Party Frame Bot — v1.1 deploy notes

1) Environment
- Copy .env.template to .env and fill: DATABASE_URL, WHATSAPP_TOKEN, SERVICE_ACCOUNT_JSON_PATH, DRIVE_ROOT_FOLDER_ID, WHATSAPP_PHONE_ID

2) Database
- Run migrations: psql $DATABASE_URL -f migrations/001_add_participants.sql

3) Install deps
- npm install
- npm run build (if needed)

4) Start
- npm start
- start worker: node src/jobs/genzip.js (or create a separate worker process)

5) To enable reverse tunnel (OpenClaw connection to WSL)
- See workspace PLANO_v1.1.md and created tunnel scripts in /root/.openclaw/workspace

6) Admin endpoints
- POST /admin/events/:id/close
- POST /admin/events/:id/genzip
- GET /admin/events/:id/stats

Notes
- This PR adds backend scaffolding only. Frontend/dashboard edits are left for later.
