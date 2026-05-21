DROP VIEW "public"."games_with_maps";--> statement-breakpoint
CREATE VIEW "public"."games_with_maps" AS (select "games"."id", "games"."name", "games"."slug", "images"."url", 
          json_agg(
            json_build_object(
              'id', "maps"."id",
              'name', "maps"."name",
              'slug', "maps"."slug"
            )
          )
         as "maps" from "games" inner join "maps" on "maps"."game_id" = "games"."id" inner join "images" on "images"."id" = "games"."image_id" where ("games"."deleted_at" is null and "maps"."deleted_at" is null) group by "games"."id", "games"."name", "images"."url");