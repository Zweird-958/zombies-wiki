CREATE TABLE "steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"content" text NOT NULL,
	"guide_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_guide_id_guides_id_fk" FOREIGN KEY ("guide_id") REFERENCES "public"."guides"("id") ON DELETE no action ON UPDATE no action;