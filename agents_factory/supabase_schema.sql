-- Supabase (Postgres) schema for kb_chunks with pgvector
-- Requires: extension pgvector, extension pgcrypto (for gen_random_uuid)

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

-- configurable vector dimension: replace <VECTOR_DIM> before running or set with a numeric literal
-- e.g. ALTER TABLE ... embedding vector(1536);

CREATE TABLE IF NOT EXISTS kb_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repo text NOT NULL,
  branch text NOT NULL DEFAULT 'main',
  source_path text NOT NULL,
  chunk_index int NOT NULL,
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  content_hash text NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT kb_chunks_unique UNIQUE (repo, branch, source_path, chunk_index)
);

CREATE INDEX IF NOT EXISTS idx_kb_chunks_content_hash ON kb_chunks (content_hash);
-- vector index (ivfflat if pgvector compiled with ivfflat support)
-- For pgvector >= 0.4 you can use ivfflat or hnsw depending on build. Use: 
-- CREATE INDEX IF NOT EXISTS idx_kb_chunks_embedding ON kb_chunks USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
-- If ivfflat not available, document alternative: use brute-force ordering LIMIT k (slower) or upgrade pgvector.

-- Example HNSW index (if supported):
-- CREATE INDEX IF NOT EXISTS idx_kb_chunks_embedding_hnsw ON kb_chunks USING hnsw (embedding vector_l2_ops) WITH (m = 16, ef_construction = 200);

-- RPC: match_kb_chunks
CREATE OR REPLACE FUNCTION match_kb_chunks(query_embedding vector, match_count int DEFAULT 8, filter jsonb DEFAULT '{}'::jsonb)
RETURNS TABLE(id uuid, repo text, branch text, source_path text, chunk_index int, content text, metadata jsonb, similarity double precision) AS $$
DECLARE
  cond text := '';
BEGIN
  -- build optional filters from JSON: supports metadata->>'project', metadata->'tags' (array contains)
  IF filter ? 'project' THEN
    cond := cond || format(' AND metadata->>''project'' = %L', filter->> 'project');
  END IF;
  IF filter ? 'tags' THEN
    -- tags is expected to be array of strings; we match if any tag overlaps
    cond := cond || format(' AND (metadata->''tags'') \?\| array[%s]', (SELECT string_agg(quote_literal(x), ',') FROM jsonb_array_elements_text(filter->'tags') AS t(x)) );
  END IF;

  RETURN QUERY EXECUTE format(
    'SELECT id, repo, branch, source_path, chunk_index, content, metadata, 1 - (embedding <=> %L)::double precision as similarity FROM kb_chunks WHERE embedding IS NOT NULL %s ORDER BY embedding <=> %L LIMIT %s',
    query_embedding::text, cond, query_embedding::text, match_count
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Note: depending on pgvector version, operator <=> returns distance; adjust similarity calc accordingly.
