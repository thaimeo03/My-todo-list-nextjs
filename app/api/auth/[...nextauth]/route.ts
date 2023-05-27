import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !user.hashedPassword) {
                    throw new Error("Email does not exist")
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword)
                if (!isCorrectPassword) {
                    throw new Error("Incorrect password")
                }

                return user
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    session: { strategy: "jwt" },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                if (!profile) return true
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: profile.email,
                    },
                })
                if (existingUser) return true
                await prisma.user.create({
                    data: {
                        email: profile.email as string,
                        name: profile.name as string,
                        image: profile.image,
                        hashedPassword: "",
                    },
                })
            }
            return true
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
