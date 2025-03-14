ALTER TABLE "job_postings" ADD COLUMN "tags" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
CREATE INDEX "clerk_id_index" ON "users" USING btree ("clerk_id");