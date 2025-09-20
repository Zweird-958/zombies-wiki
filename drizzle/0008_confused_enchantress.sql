ALTER TABLE "guides" DROP CONSTRAINT "guides_game_id_games_id_fk";
ALTER TABLE "guides" RENAME COLUMN "game_id" TO "map_id";--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "guides" ADD CONSTRAINT "guides_map_id_maps_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."maps"("id") ON DELETE no action ON UPDATE no action;