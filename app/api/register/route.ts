import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email is already exists" }), {
                status: 401,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await prisma.user.create({
            data: {
                email,
                name: name,
                hashedPassword,
                image: "",
            },
        })

        return new Response(JSON.stringify({ newUser }))
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
