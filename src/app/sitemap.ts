import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
const routes = ["", "/servicios", "/nosotros", "/proyectos", "/contacto", "/legal", "/privacidad", "/cookies"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/legal") || route.startsWith("/privacidad") || route.startsWith("/cookies") ? 0.3 : 0.8,
  }));
}
