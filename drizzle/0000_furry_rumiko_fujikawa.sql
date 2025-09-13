CREATE TABLE IF NOT EXISTS "personal_website_blog_post" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "personal_website_blog_post_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"author" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personal_website_image" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "personal_website_image_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"blog_post_id" integer NOT NULL,
	"url" varchar NOT NULL,
	"image_name" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personal_website_image" ADD CONSTRAINT "personal_website_image_blog_post_id_personal_website_blog_post_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."personal_website_blog_post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
