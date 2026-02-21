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

export type LeadInput = z.infer<typeof leadSchema>;
export type DonationClickInput = z.infer<typeof donationClickSchema>;
