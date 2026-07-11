import { MetadataRoute } from "next";
import { fetchBlogs, fetchNotices, fetchPrograms } from "@/lib/db-fetch";
import { slugify } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.swasthyarautmai.com";

  // Define the main static pages with their relative paths
  const staticRoutes = [
    "",
    "/about",
    "/appointments",
    "/blogs",
    "/citizen-charter",
    "/contact",
    "/downloads",
    "/emergency",
    "/gallery",
    "/grievance",
    "/institutions",
    "/notices",
    "/programs",
    "/reports",
    "/staff",
    "/videos",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Retrieve dynamic items from db-fetch
    const [blogs, notices, programs] = await Promise.all([
      fetchBlogs(),
      fetchNotices(),
      fetchPrograms(),
    ]);

    // 1. Add Dynamic Blog posts
    blogs.forEach((blog) => {
      if (blog.slug) {
        let lastMod = new Date();
        if (blog.published_at) {
          const parsed = new Date(blog.published_at);
          if (!isNaN(parsed.getTime())) {
            lastMod = parsed;
          }
        }
        sitemapEntries.push({
          url: `${baseUrl}/blogs/${blog.slug}`,
          lastModified: lastMod,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    });

    // 2. Add Dynamic Notices
    notices.forEach((notice) => {
      let lastMod = new Date();
      if (notice.date) {
        const parsed = new Date(notice.date.replace(/\//g, "-"));
        if (!isNaN(parsed.getTime())) {
          lastMod = parsed;
        }
      }
      sitemapEntries.push({
        url: `${baseUrl}/notices/${slugify(notice.title)}`,
        lastModified: lastMod,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });

    // 3. Add Dynamic Programs
    programs.forEach((program) => {
      sitemapEntries.push({
        url: `${baseUrl}/programs/${slugify(program.title)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
  }

  return sitemapEntries;
}
