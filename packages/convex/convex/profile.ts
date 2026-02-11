import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get main profile information
 */
export const getProfile = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.query("profile").first();

    if (!profile) return null;

    return {
      _id: profile._id,
      _creationTime: profile._creationTime,
      name: profile.name,
      title: profile.title[args.locale as "en" | "es"],
      bio: profile.bio[args.locale as "en" | "es"],
      email: profile.email,
      location: profile.location,
      profileImageUrl: profile.profileImageUrl,
    };
  },
});

/**
 * Get all skills ordered
 */
export const getSkills = query({
  args: {
    locale: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let skillsQuery = ctx.db.query("skills");

    if (args.category) {
      skillsQuery = skillsQuery.withIndex("by_category", (q) =>
        q.eq("category", args.category as string)
      );
    } else {
      skillsQuery = skillsQuery.withIndex("by_order");
    }

    const skills = await skillsQuery.order("asc").collect();

    return skills.map((skill) => ({
      _id: skill._id,
      _creationTime: skill._creationTime,
      name: skill.name,
      icon: skill.icon,
      category: skill.category,
      order: skill.order,
      tooltip: skill.tooltip
        ? skill.tooltip[args.locale as "en" | "es"]
        : undefined,
    }));
  },
});

/**
 * Get social links ordered
 */
export const getSocialLinks = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("socialLinks")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});
