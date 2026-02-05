MVP Fábrica de Agentes — Clawdbot + n8n + Supabase (pgvector) + Obsidian Vault

Resumo
- Objetivo: pipeline RAG onde Obsidian (GitHub repo privado) é fonte de verdade; n8n ingere e atualiza chunks/embeddings no Supabase (pgvector). Clawdbot usa skills HTTP para acionar ingestão e buscar contexto via RPC match_kb_chunks.

Entregáveis criados aqui:
- supabase/schema.sql — SQL para criar tabela kb_chunks e função RPC match_kb_chunks
- n8n/ — templates de workflows (A: GitHub push→ingest, B: /ingest, C: /rag)
- prompt/clawdbot_prompt.txt — prompt pronto para copiar/colar no agente

Paths gerados:
- /root/.openclaw/workspace/agents_factory/supabase_schema.sql
- /root/.openclaw/workspace/agents_factory/prompt_clawdbot.txt
- /root/.openclaw/workspace/agents_factory/n8n_workflows/ (descritivos)

Notas
- Algumas ações (GitHub token, Supabase credentials, embedding provider API keys) precisam ser preenchidas no ambiente antes de executar workflows.
- Esta entrega contém tudo que não depende de sua interação direta (arquivos, SQL e prompts). Quando quiser, eu implanto os workflows n8n e crio a base Supabase se me autorizar com credenciais.
