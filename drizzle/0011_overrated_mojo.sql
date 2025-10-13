CREATE VIEW "public"."games_with_maps" AS (select "games"."id", "games"."name", "games"."normalized_name", "images"."url", 'https://localhost:3000/' || "images"."url" as "test", 
          json_agg(
            json_build_object(
              'id', "maps"."id",
              'name', "maps"."name",
              'normalizedName', "maps"."normalized_name"
            )
          )
         as "maps" from "games" inner join "maps" on "maps"."game_id" = "games"."id" inner join "images" on "images"."id" = "games"."image_id" group by "games"."id", "games"."name", "images"."url");