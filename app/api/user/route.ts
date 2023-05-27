import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: Request) {
    if(req.method !== "GET") {
        return new Response("Endpoint unknown", {status: 401})
    }
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
        return new Response("User not found", {status: 401})
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    })

    if(!user) {
        return new Response("User not found", {status: 401})
    }

    return new Response(JSON.stringify(user))
}