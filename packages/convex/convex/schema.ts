import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Database schema for jesusarrioja.dev portfolio
 *
 * i18n Strategy: All user-facing text stored as objects: { en: string, es: string }
 * Convex queries accept locale parameter and return localized strings
 */

export default defineSchema({
  // ====================
  // Core Portfolio Tables
  // ====================

  /**
   * Profile Information (single document)
   * Main profile data displayed in hero section
   */
  profile: defineTable({
    name: v.string(),
    title: v.object({
      en: v.string(),
      es: v.string(),
    }),
    bio: v.object({
      en: v.string(),
      es: v.string(),
    }),
    email: v.string(),
    location: v.string(),
    profileImageUrl: v.string(), // Path to image in public/ or Convex storage ID
  }),

  /**
   * Social Links (4 documents: Twitter, LinkedIn, Medium, Instagram)
   */
  socialLinks: defineTable({
    platform: v.string(), // "twitter", "linkedin", "medium", "instagram"
    url: v.string(),
    icon: v.string(), // Icon identifier (e.g., "twitter", "linkedin")
    order: v.number(),
  }).index("by_order", ["order"]),

  /**
   * Skills (16 documents from current site)
   * Technologies displayed as icon badges
   */
  skills: defineTable({
    name: v.string(),
    icon: v.string(), // Icon identifier (e.g., "html5", "css3", "javascript")
    category: v.optional(v.string()), // "frontend", "backend", "devops", etc.
    order: v.number(),
    tooltip: v.optional(
      v.object({
        en: v.string(),
        es: v.string(),
      })
    ),
  })
    .index("by_order", ["order"])
    .index("by_category", ["category", "order"]),

  /**
   * Projects (33 documents from current site)
   * Portfolio items with custom gradients and features
   */
  projects: defineTable({
    name: v.object({
      en: v.string(),
      es: v.string(),
    }),
    slug: v.string(), // URL-friendly identifier
    logoUrl: v.string(), // Path to logo image
    features: v.array(
      v.object({
        en: v.string(),
        es: v.string(),
      })
    ),
    url: v.optional(v.string()), // Project website URL
    agency: v.optional(
      v.object({
        name: v.string(),
        logoUrl: v.string(),
        url: v.string(),
      })
    ),
    gradient: v.object({
      from: v.string(), // Hex color for gradient start
      to: v.string(), // Hex color for gradient end
    }),
    isActive: v.boolean(), // false for "Also worked on" section
    isFeatured: v.boolean(), // true for main portfolio showcase
    order: v.number(),
    createdAt: v.number(), // Timestamp for sorting
  })
    .index("by_order", ["order"])
    .index("by_active", ["isActive", "order"])
    .index("by_featured", ["isFeatured", "order"]),

  // ====================
  // CV/Resume Tables
  // ====================

  /**
   * CV Profile (single document)
   * Separate from main profile for CV-specific formatting
   */
  cvProfile: defineTable({
    fullName: v.string(),
    title: v.object({
      en: v.string(),
      es: v.string(),
    }),
    summary: v.object({
      en: v.string(),
      es: v.string(),
    }),
    email: v.string(),
    location: v.string(),
    website: v.string(),
    linkedIn: v.string(),
  }),

  /**
   * Work Experience (4 positions from CV files)
   * Job positions with nested projects
   */
  experiences: defineTable({
    title: v.object({
      en: v.string(),
      es: v.string(),
    }),
    company: v.string(),
    companyUrl: v.optional(v.string()),
    location: v.string(),
    startDate: v.string(), // ISO date or "YYYY-MM"
    endDate: v.optional(v.string()), // null for current position
    isCurrent: v.boolean(),
    description: v.object({
      en: v.string(),
      es: v.string(),
    }),
    responsibilities: v.array(
      v.object({
        en: v.string(),
        es: v.string(),
      })
    ),
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
    order: v.number(), // For reverse chronological sorting
  }).index("by_order", ["order"]),

  /**
   * CV Skills (6 skill categories)
   * Categorized skills for CV display (different from portfolio skills)
   */
  cvSkills: defineTable({
    category: v.object({
      en: v.string(),
      es: v.string(),
    }),
    skills: v.array(v.string()), // Array of skill names
    order: v.number(),
  }).index("by_order", ["order"]),

  /**
   * Certifications (5 certifications)
   */
  certifications: defineTable({
    name: v.object({
      en: v.string(),
      es: v.string(),
    }),
    organization: v.string(),
    date: v.optional(v.string()), // "YYYY-MM" or "YYYY"
    url: v.optional(v.string()),
    order: v.number(),
  }).index("by_order", ["order"]),

  /**
   * Education (1 university degree)
   */
  education: defineTable({
    degree: v.object({
      en: v.string(),
      es: v.string(),
    }),
    institution: v.string(),
    location: v.string(),
    startYear: v.string(),
    endYear: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  /**
   * Languages (2 languages: Spanish native, English professional)
   */
  languages: defineTable({
    language: v.string(), // Language name (e.g., "Spanish", "English")
    proficiency: v.object({
      en: v.string(),
      es: v.string(),
    }),
    order: v.number(),
  }).index("by_order", ["order"]),
});
