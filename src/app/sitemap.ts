import type { MetadataRoute } from "next";
import { env } from "~/env.js";
import { db } from "~/server/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: `https://${env.DOMAIN_NAME}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `https://${env.DOMAIN_NAME}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `https://${env.DOMAIN_NAME}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `https://${env.DOMAIN_NAME}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `https://${env.DOMAIN_NAME}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];
  const sitemap = [...defaultPages, ...(await GetBlogPosts())];

  return sitemap;
}

// Adds blogs to the sitemap.
async function GetBlogPosts() {
  const result = await db.query.blogPosts.findMany();

  const blogPostSitemap = [];

  for (const post of result) {
    blogPostSitemap.push({
      url: `https://${env.DOMAIN_NAME}/blog-post/${post.id}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    });
  }

  return blogPostSitemap;
}
