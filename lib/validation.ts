import { z } from "zod";
export const signupSchema = z.object({ name: z.string().trim().min(2).max(80), email: z.string().trim().email(), password: z.string().min(8).max(72).regex(/[A-Z]/, "Include an uppercase letter").regex(/[0-9]/, "Include a number") });
export const profileSchema = z.object({ name: z.string().trim().min(2).max(80), image: z.string().trim().url().or(z.literal("")), phone: z.string().trim().max(30), bio: z.string().trim().max(500), location: z.string().trim().max(120) });
export const passwordSchema = z.object({ currentPassword: z.string().min(1), newPassword: signupSchema.shape.password });
