import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all active projects with localized content
 */
export const getProjects = query({
  args: {
    locale: v.string(), // "en" or "es"
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let projectsQuery = ctx.db.query("projects");

    // Filter by featured if provided
    if (args.featured !== undefined) {
      projectsQuery = projectsQuery
        .withIndex("by_featured", (q) =>
          q.eq("isFeatured", args.featured as boolean)
        );
    }

    const projects = await projectsQuery
      .order("asc")
      .collect();

    // Transform to return localized strings
    return projects.map((project) => ({
      _id: project._id,
      _creationTime: project._creationTime,
      name: project.name[args.locale as "en" | "es"],
      slug: project.slug,
      logoUrl: project.logoUrl,
      features: project.features.map((f) => f[args.locale as "en" | "es"]),
      url: project.url,
      agency: project.agency,
      gradient: project.gradient,
      isActive: project.isActive,
      isFeatured: project.isFeatured,
      order: project.order,
      createdAt: project.createdAt,
    }));
  },
});

/**
 * Get a single project by slug
 */
export const getProjectBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (!project) return null;

    return {
      _id: project._id,
      _creationTime: project._creationTime,
      name: project.name[args.locale as "en" | "es"],
      slug: project.slug,
      logoUrl: project.logoUrl,
      features: project.features.map((f) => f[args.locale as "en" | "es"]),
      url: project.url,
      agency: project.agency,
      gradient: project.gradient,
      isActive: project.isActive,
      isFeatured: project.isFeatured,
      order: project.order,
      createdAt: project.createdAt,
    };
  },
});
