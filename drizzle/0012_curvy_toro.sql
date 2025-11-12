DROP VIEW "public"."games_with_maps";--> statement-breakpoint
ALTER TABLE "games" RENAME COLUMN "normalized_name" TO "slug";--> statement-breakpoint
ALTER TABLE "maps" RENAME COLUMN "normalized_name" TO "slug";--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_normalized_name_unique";--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_slug_unique" UNIQUE("slug");--> statement-breakpoint
CREATE VIEW "public"."games_with_maps" AS (select "games"."id", "games"."name", "games"."slug", "images"."url", 
          json_agg(
            json_build_object(
              'id', "maps"."id",
              'name', "maps"."name",
              'slug', "maps"."slug"
            )
          )
         as "maps" from "games" inner join "maps" on "maps"."game_id" = "games"."id" inner join "images" on "images"."id" = "games"."image_id" group by "games"."id", "games"."name", "images"."url");