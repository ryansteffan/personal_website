import { relations, sql } from "drizzle-orm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { int } from "drizzle-orm/mysql-core";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `personal_website_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

// Blog posts tables
export const blogPosts = createTable("blog_post", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: varchar("author_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
});

export const images = createTable("image", {
  id: varchar("id").notNull().primaryKey(),
  blogPostId: varchar("blog_post_id", { length: 255 })
    .notNull()
    .references(() => blogPosts.id),
  url: varchar("url").notNull(),
});

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, { fields: [blogPosts.authorId], references: [users.id] }),
  images: many(images),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  blogPost: one(blogPosts, { fields: [images.id], references: [blogPosts.id] }),
}));
