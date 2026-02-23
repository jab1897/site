import { z } from "zod";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  smsOptIn: z.boolean().default(false),
  locale: z.enum(locales),
  source: z.string().default("website")
});

export const donationClickSchema = z.object({
  amount: z.string(),
  locale: z.enum(locales),
  path: z.string(),
  referrer: z.string().optional(),
  userAgent: z.string().optional()
});

export const volunteerSignupSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().or(z.literal("")),
  zip: z.string().trim().min(1),
  interest: z.string().trim().min(1),
  updatesOptIn: z.boolean().default(true),
  smsOptIn: z.boolean().default(false),
  sourcePath: z.string().trim().min(1),
  locale: z.enum(locales),
  company: z.string().optional()
});

export type LeadInput = z.infer<typeof leadSchema>;
export type DonationClickInput = z.infer<typeof donationClickSchema>;
export type VolunteerSignupInput = z.infer<typeof volunteerSignupSchema>;
