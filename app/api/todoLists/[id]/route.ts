import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request, {params} : {params: {id: string}}) {
    if(req.method !== "GET") {
        return new Response("Endpoint not found", {status: 401})
    }  
    
    const todoLists = await prisma.todoList.findMany({
        where: {
            user_id: params.id,
        },
    })
 
    if(!todoLists) {
        return new Response("Something error", {status: 401})
    }
    return new Response(JSON.stringify(todoLists))
}

export async function DELETE(req: Request, {params} : {params: {id: string}}) {
    if(req.method !== "DELETE") {
        return new Response("Endpoint not found", {status: 401})
    }
    
    const deletedTodoList = await prisma.todoList.delete({
        where: {
            id: params.id
        }
    })

    if(!deletedTodoList) {
        return new Response("Something error", {status: 401})
    }
    
    return new Response(JSON.stringify(deletedTodoList))
}