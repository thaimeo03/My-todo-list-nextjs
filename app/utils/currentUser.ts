import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()


export async function getUser() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
        redirect("/auth")
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

    return user
}
