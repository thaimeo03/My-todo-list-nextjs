import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function PUT(req: Request, {params} : {params: {id: string}}) {
    if(req.method !== "PUT") {
        return new Response("Endpoint unknown", {status: 405})
    }

    try {
        const {status} = await req.json()

        const todo = await prisma.work.update({
            where: {
                id: params.id
            },
            data: {
                status
            }
        })

        if(!todo) {
            return new Response("Todo not found", {status: 404})
        }

        return new Response(JSON.stringify(todo))
    } catch (error) {
        return new Response("Internal Server Error", {status: 500})
    }
}