-- Migration: Migrate featured field to pinnedAt
-- If featured=1, set pinnedAt to current timestamp
-- If featured=0, keep pinnedAt as null

UPDATE posts
SET pinned_at = CAST(strftime('%s', 'now') AS INTEGER)
WHERE featured = 1 AND pinned_at IS NULL;
