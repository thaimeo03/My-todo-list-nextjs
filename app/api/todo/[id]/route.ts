import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function GET(req: Request, {params} : {params: {id: string}}) {
    if(req.method !== "GET") {
        return new Response("Endpoint unknown", {status: 405})
    }
    try {
        const todoList = await prisma.work.findMany({
            where: {
                todo_list_id: params.id
            }
        })
    
        if(!todoList) {
            return new Response("Todo list not found", {status: 404})
        }
    
        return new Response(JSON.stringify(todoList))
    } catch (error) {
        return new Response("Internal Server Error", {status: 500})
    }
}

export async function POST(req: Request, {params} : {params: {id: string}}) {
    if(req.method !== "POST") {
        return new Response("Endpoint unknown", {status: 405})
    }

    try {
        const {name, finishDate} = await req.json()
    
        const todo = await prisma.work.create({
          data: {
            name,
            finishDate,
            todo_list_id: params.id
          }
        })
    
        if(!todo) {
          return new Response("Todo list not found", {status: 404})
        }
    
        return new Response(JSON.stringify(todo))
      } catch (error) {
        return new Response("Internal Server Error", {status: 500})
      }
}

export async function DELETE(req: Request, {params} : {params: {id: string}}) {
    if(req.method !== "DELETE") {
        return new Response("Endpoint unknown", {status: 405})
    }

    try {
        const todo = await prisma.work.delete({
            where: {
                id: params.id
            }
        })
    
        if(!todo) {
            return new Response("Todo list not found", {status: 404})
        }
    
        return new Response(JSON.stringify(todo))
    } catch (error) {
        return new Response("Internal Server Error", {status: 500})
    }
}