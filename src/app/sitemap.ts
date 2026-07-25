import type { MetadataRoute } from "next";

const siteUrl = "https://www.richinmrudul.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}/og.png`],
    },
  ];
}
