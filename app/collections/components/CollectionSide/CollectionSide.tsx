"use client"
import TodoListItem from "../TodoListItem"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { BsPlus } from "react-icons/bs"
import { handleCreateTodoList } from "@/app/utils/todoListAction"
import useSWR, { mutate } from "swr"
import { fetcher } from "@/app/utils/fetcher"
import { TodoList } from "@prisma/client"
import { useToast } from "@/app/components/ui/use-toast"

export default function CollectionSide({ userId }: { userId: string }) {
    const { data }: { data: TodoList[] } = useSWR(`/api/todoLists/${userId}`, fetcher)
    const { toast } = useToast()

    async function handleAction(formData: FormData) {
        try {
            await handleCreateTodoList(formData, userId)
            mutate(`/api/todoLists/${userId}`)
            toast({
                title: "Successfully",
            })
        } catch (error: any) {
            console.error(error.message)
        }
    }

    return (
        <div className="bg-[#181820] w-full h-scroll">
            <div className="max-w-screen-xl ml-auto mr-auto">
                <div className="flex items-center space-x-5 pt-9">
                    <h1 className="text-white text-xl font-semibold">Your collections</h1>
                    <Dialog>
                        <DialogTrigger>
                            <div className="bg-[#fc76a1] text-white font-normal text-sm rounded-xl py-1 px-2 hover:bg-[#fd6693] transition flex items-center">
                                <BsPlus size={20} />
                                Add new todo list
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-[#181820]">
                            <DialogHeader className="text-white">
                                <DialogTitle className="text-[#fc76a1] text-2xl">
                                    New todo list
                                </DialogTitle>
                                <DialogDescription className="text-white">
                                    A new plan, a new success. Good luck with your work
                                </DialogDescription>
                            </DialogHeader>
                            <form className="mt-5 w-full mx-auto" action={handleAction}>
                                <div className="flex space-x-3 items-center justify-between">
                                    <label htmlFor="name" className="text-white text-base">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Todo list name..."
                                        className="px-2 py-1 w-[75%] text-base bg-transparent text-white outline-none border border-white rounded-sm placeholder:text-white placeholder:opacity-40"
                                    />
                                </div>
                                <div className="flex space-x-3 items-center justify-between">
                                    <label htmlFor="name" className="text-white text-base">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Your description"
                                        name="description"
                                        className="px-2 py-1 mt-5 text-base w-[75%] min-h-[80px] bg-transparent text-white outline-none border border-white rounded-sm placeholder:text-white placeholder:opacity-40"
                                    />
                                </div>
                                <button
                                    className="capitalize bg-[#fc76a1] py-1 px-4 text-white rounded mt-5 hover:bg-[#fd6693] flex items-center"
                                    type="submit"
                                >
                                    Create todo list
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-5 pt-7 gap-5">
                    {data && data.map((todoList: TodoList) => (
                        <TodoListItem key={todoList.id} todoList={todoList} />
                    ))}
                </div>
            </div>
        </div>
    )
}
