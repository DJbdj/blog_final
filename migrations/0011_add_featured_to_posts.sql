-- Add featured column to posts table
ALTER TABLE posts ADD COLUMN featured integer DEFAULT 0 NOT NULL;
