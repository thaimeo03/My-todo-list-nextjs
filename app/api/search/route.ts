import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    if(req.method !== "POST") return new Response("Method not allowed", { status: 405 })
    try {
        const {userId, search} = await req.json()

        const todoLists = await prisma.todoList.findMany({
            where: {
                user_id: userId,
            }
        })

        if(!todoLists) return new Response("Not found", { status: 404 })

        const result = todoLists.find(todoList => todoList.name.toLowerCase().includes(search.toLowerCase()))
        if(!result) return new Response("Not found", { status: 404 })
        return new Response(JSON.stringify(result), { status: 200 })

    } catch (error) {
        return new Response("Something error", { status: 500 })
    }

}