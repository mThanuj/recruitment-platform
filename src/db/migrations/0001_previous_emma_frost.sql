ALTER TABLE "users" ALTER COLUMN "clerk_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'candidate';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;