PLANO v1.1 — Party Frame Bot

Objetivo
- Evoluir o MVP para v1.1: garantir evento ativo único, welcome message, geração de ZIP e métricas mínimas.

Entregáveis
1) Migration SQL: add participants table + event.status
2) Backend: webhook welcome logic, admin endpoints (close, genzip), metrics endpoint
3) Drive helper + genzip worker
4) .env.template and README updates
5) Branch + PR: v1.1/product

Passos de implementação (detalhado)
- Criar migration: migrations/001_add_participants.sql
- Criar src/drive.js: helper mínimo para upload via googleapis (require SERVICE_ACCOUNT_JSON_PATH env)
- Criar src/jobs/genzip.js: worker que gera ZIP da pasta do evento (listar via Drive API or via DB) e faz upload
- Criar src/admin.js: endpoints POST /admin/events/:id/close and POST /admin/events/:id/genzip and GET /admin/events/:id/stats
- Atualizar webhook handler (src/webhook.js) para marcar participant e enviar welcome once
- Adicionar .env.template
- Update README with deploy notes

Deploy flow
- Você revisa PR → merge → deploy no lovable.app (ou seu host)
- After deploy place SERVICE_ACCOUNT JSON in environment and set WHATSAPP_TOKEN

Notas de segurança
- Não commitarei nenhum secret.
- Se houver secrets já comitados, eu reporto e aguardo sua autorização para remover do histórico.

Estimativa
- Mudanças implementadas neste PR: minimal backend + worker + migration + docs.

Contato
- Se quiser que eu também abra o PR com labels e assign, me avise.
