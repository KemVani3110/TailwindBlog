/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const users = [
    {
        id: "1",
        email: "admin@nextblog.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
        avatar: "/ava1.png"
    },
    {
        id: "2",
        email: "user@nextblog.com",
        password: "user123",
        name: "Regular User",
        role: "user",
        avatar: "/ava1.png"
    },
    {
        id: "3",
        email: "chuminhkhoi3110@gmail.com",
        password: "khoi123",
        name: "Minh Khôi",
        role: "admin",
        avatar: "/ava1.png"
    },
];

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = users.find(
                    u => u.email === credentials.email && u.password === credentials.password
                );

                if (user) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        image: user.avatar
                    };
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        signOut: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };