"use server"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function handleCreateTodoList(formData: FormData, userId: string) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    if (!name) throw new Error("Names cannot be omitted")

    try {
        await prisma.todoList.create({
            data: {
                name,
                description,
                user_id: userId,
            },
        })
        revalidatePath("/collections")
    } catch (error) {
        console.error(error)
        throw new Error("Something went wrong")
    }
}

export async function handleUpdateTodoList(formData: FormData, todoListId: string) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    console.log(name, description);
    

    if (!name) throw new Error("Names cannot be omitted")
    try {
        await prisma.todoList.update({
            where: {
                id: todoListId,
            },
            data: {
                name,
                description
            }
        })
        revalidatePath("/collections")

    } catch (error) {
        throw new Error("Something went wrong")
    }

}