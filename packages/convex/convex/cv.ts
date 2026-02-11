import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get CV profile information
 */
export const getCVProfile = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const cvProfile = await ctx.db.query("cvProfile").first();

    if (!cvProfile) return null;

    return {
      _id: cvProfile._id,
      _creationTime: cvProfile._creationTime,
      fullName: cvProfile.fullName,
      title: cvProfile.title[args.locale as "en" | "es"],
      summary: cvProfile.summary[args.locale as "en" | "es"],
      email: cvProfile.email,
      location: cvProfile.location,
      website: cvProfile.website,
      linkedIn: cvProfile.linkedIn,
    };
  },
});

/**
 * Get work experiences ordered (reverse chronological)
 */
export const getExperiences = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const experiences = await ctx.db
      .query("experiences")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return experiences.map((exp) => ({
      _id: exp._id,
      _creationTime: exp._creationTime,
      title: exp.title[args.locale as "en" | "es"],
      company: exp.company,
      companyUrl: exp.companyUrl,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      isCurrent: exp.isCurrent,
      description: exp.description[args.locale as "en" | "es"],
      responsibilities: exp.responsibilities.map(
        (r) => r[args.locale as "en" | "es"]
      ),
      projects: exp.projects?.map((p) => ({
        name: p.name[args.locale as "en" | "es"],
        description: p.description[args.locale as "en" | "es"],
        techStack: p.techStack,
        responsibilities: p.responsibilities
          ? p.responsibilities[args.locale as "en" | "es"]
          : undefined,
      })),
      order: exp.order,
    }));
  },
});

/**
 * Get CV skills categorized
 */
export const getCVSkills = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const cvSkills = await ctx.db
      .query("cvSkills")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return cvSkills.map((skillGroup) => ({
      _id: skillGroup._id,
      _creationTime: skillGroup._creationTime,
      category: skillGroup.category[args.locale as "en" | "es"],
      skills: skillGroup.skills,
      order: skillGroup.order,
    }));
  },
});

/**
 * Get certifications ordered
 */
export const getCertifications = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const certifications = await ctx.db
      .query("certifications")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return certifications.map((cert) => ({
      _id: cert._id,
      _creationTime: cert._creationTime,
      name: cert.name[args.locale as "en" | "es"],
      organization: cert.organization,
      date: cert.date,
      url: cert.url,
      order: cert.order,
    }));
  },
});

/**
 * Get education records ordered
 */
export const getEducation = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const education = await ctx.db
      .query("education")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return education.map((edu) => ({
      _id: edu._id,
      _creationTime: edu._creationTime,
      degree: edu.degree[args.locale as "en" | "es"],
      institution: edu.institution,
      location: edu.location,
      startYear: edu.startYear,
      endYear: edu.endYear,
      order: edu.order,
    }));
  },
});

/**
 * Get languages ordered
 */
export const getLanguages = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const languages = await ctx.db
      .query("languages")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return languages.map((lang) => ({
      _id: lang._id,
      _creationTime: lang._creationTime,
      language: lang.language,
      proficiency: lang.proficiency[args.locale as "en" | "es"],
      order: lang.order,
    }));
  },
});

/**
 * Get complete CV data in one query
 */
export const getCompleteCV = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const [
      profile,
      experiences,
      skills,
      certifications,
      education,
      languages,
    ] = await Promise.all([
      ctx.db.query("cvProfile").first(),
      ctx.db.query("experiences").withIndex("by_order").order("asc").collect(),
      ctx.db.query("cvSkills").withIndex("by_order").order("asc").collect(),
      ctx.db
        .query("certifications")
        .withIndex("by_order")
        .order("asc")
        .collect(),
      ctx.db.query("education").withIndex("by_order").order("asc").collect(),
      ctx.db.query("languages").withIndex("by_order").order("asc").collect(),
    ]);

    return {
      profile: profile
        ? {
            fullName: profile.fullName,
            title: profile.title[args.locale as "en" | "es"],
            summary: profile.summary[args.locale as "en" | "es"],
            email: profile.email,
            location: profile.location,
            website: profile.website,
            linkedIn: profile.linkedIn,
          }
        : null,
      experiences: experiences.map((exp) => ({
        title: exp.title[args.locale as "en" | "es"],
        company: exp.company,
        companyUrl: exp.companyUrl,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        description: exp.description[args.locale as "en" | "es"],
        responsibilities: exp.responsibilities.map(
          (r) => r[args.locale as "en" | "es"]
        ),
        projects: exp.projects?.map((p) => ({
          name: p.name[args.locale as "en" | "es"],
          description: p.description[args.locale as "en" | "es"],
          techStack: p.techStack,
          responsibilities: p.responsibilities
            ? p.responsibilities[args.locale as "en" | "es"]
            : undefined,
        })),
      })),
      skills: skills.map((skillGroup) => ({
        category: skillGroup.category[args.locale as "en" | "es"],
        skills: skillGroup.skills,
      })),
      certifications: certifications.map((cert) => ({
        name: cert.name[args.locale as "en" | "es"],
        organization: cert.organization,
        date: cert.date,
        url: cert.url,
      })),
      education: education.map((edu) => ({
        degree: edu.degree[args.locale as "en" | "es"],
        institution: edu.institution,
        location: edu.location,
        startYear: edu.startYear,
        endYear: edu.endYear,
      })),
      languages: languages.map((lang) => ({
        language: lang.language,
        proficiency: lang.proficiency[args.locale as "en" | "es"],
      })),
    };
  },
});
