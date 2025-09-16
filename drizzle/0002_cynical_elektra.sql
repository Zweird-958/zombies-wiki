CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "images_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "normalized_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "image_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_normalized_name_unique" UNIQUE("normalized_name");