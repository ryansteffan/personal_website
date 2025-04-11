import type { MetadataRoute } from "next";
import { env } from "~/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/priv"],
      },
    ],
    sitemap: `https://${env.DOMAIN_NAME}/sitemap.xml`,
  };
}
