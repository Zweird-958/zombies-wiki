ALTER TABLE "games" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "guides" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "steps" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "maps" ADD COLUMN "deleted_at" timestamp;