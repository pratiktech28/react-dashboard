import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db), session: { strategy: "jwt" }, trustHost: true, pages: { signIn: "/login" },
  providers: [Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }), Credentials({ credentials: { email: {}, password: {} }, async authorize(raw) {
    const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(raw); if (!parsed.success) return null;
    const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!user?.passwordHash || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null;
    await db.userActivity.create({ data: { userId: user.id, type: "LOGIN", description: "Signed in with email" } });
    return { id: user.id, name: user.name, email: user.email, image: user.image };
  } })],
  callbacks: { async jwt({ token, user }) { if (user) token.id = user.id; return token; }, async session({ session, token }) { if (session.user && token.id) session.user.id = token.id as string; return session; } }
});
