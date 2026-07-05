import { MetadataRoute } from "next";
import coursesData from "@/data/courses.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ibrahimtuition.co.uk";

    const courseUrls = coursesData.map((course) => ({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...courseUrls,
    ];
}