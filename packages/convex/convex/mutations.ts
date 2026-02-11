import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Mutation functions for data migration
 * These are used to populate the database from the migration script
 */

// ===================
// Profile Mutations
// ===================

export const insertProfile = mutation({
  args: {
    name: v.string(),
    title: v.object({ en: v.string(), es: v.string() }),
    bio: v.object({ en: v.string(), es: v.string() }),
    email: v.string(),
    location: v.string(),
    profileImageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("profile", args);
  },
});

export const insertSocialLink = mutation({
  args: {
    platform: v.string(),
    url: v.string(),
    icon: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("socialLinks", args);
  },
});

export const insertSkill = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    category: v.optional(v.string()),
    order: v.number(),
    tooltip: v.optional(v.object({ en: v.string(), es: v.string() })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skills", args);
  },
});

export const insertProject = mutation({
  args: {
    name: v.object({ en: v.string(), es: v.string() }),
    slug: v.string(),
    logoUrl: v.string(),
    features: v.array(v.object({ en: v.string(), es: v.string() })),
    url: v.optional(v.string()),
    agency: v.optional(
      v.object({
        name: v.string(),
        logoUrl: v.string(),
        url: v.string(),
      })
    ),
    gradient: v.object({ from: v.string(), to: v.string() }),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    order: v.number(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});

// ===================
// CV Mutations
// ===================

export const insertCVProfile = mutation({
  args: {
    fullName: v.string(),
    title: v.object({ en: v.string(), es: v.string() }),
    summary: v.object({ en: v.string(), es: v.string() }),
    email: v.string(),
    location: v.string(),
    website: v.string(),
    linkedIn: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cvProfile", args);
  },
});

export const insertExperience = mutation({
  args: {
    title: v.object({ en: v.string(), es: v.string() }),
    company: v.string(),
    companyUrl: v.optional(v.string()),
    location: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    isCurrent: v.boolean(),
    description: v.object({ en: v.string(), es: v.string() }),
    responsibilities: v.array(v.object({ en: v.string(), es: v.string() })),
    projects: v.optional(
      v.array(
        v.object({
          name: v.object({ en: v.string(), es: v.string() }),
          description: v.object({ en: v.string(), es: v.string() }),
          techStack: v.string(),
          responsibilities: v.optional(
            v.object({ en: v.string(), es: v.string() })
          ),
        })
      )
    ),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("experiences", args);
  },
});

export const insertCVSkills = mutation({
  args: {
    category: v.object({ en: v.string(), es: v.string() }),
    skills: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cvSkills", args);
  },
});

export const insertCertification = mutation({
  args: {
    name: v.object({ en: v.string(), es: v.string() }),
    organization: v.string(),
    date: v.optional(v.string()),
    url: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("certifications", args);
  },
});

export const insertEducation = mutation({
  args: {
    degree: v.object({ en: v.string(), es: v.string() }),
    institution: v.string(),
    location: v.string(),
    startYear: v.string(),
    endYear: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("education", args);
  },
});

export const insertLanguage = mutation({
  args: {
    language: v.string(),
    proficiency: v.object({ en: v.string(), es: v.string() }),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("languages", args);
  },
});

// ===================
// Utility Mutations
// ===================

/**
 * Clear all data from a table (useful for re-running migrations)
 * USE WITH CAUTION!
 */
export const clearTable = mutation({
  args: {
    tableName: v.string(),
  },
  handler: async (ctx, args) => {
    const validTables = [
      "profile",
      "socialLinks",
      "skills",
      "projects",
      "cvProfile",
      "experiences",
      "cvSkills",
      "certifications",
      "education",
      "languages",
    ];

    if (!validTables.includes(args.tableName)) {
      throw new Error(`Invalid table name: ${args.tableName}`);
    }

    // Get all documents from the table
    const docs = await ctx.db.query(args.tableName as any).collect();

    // Delete each document
    for (const doc of docs) {
      await ctx.db.delete(doc._id);
    }

    return { deleted: docs.length };
  },
});
