import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://job-tracker.noorulhassan.com"
  const now = new Date().toISOString()

  const routes = [
    "",
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/applications",
    "/dashboard/applications/add",
    "/dashboard/stats",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: (route.startsWith("/dashboard") ? "daily" : "monthly") as any,
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}
