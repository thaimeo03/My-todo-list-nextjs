"use client"
import { AiFillEdit } from "react-icons/ai"
import { TodoList } from "@prisma/client"
import Link from "next/link"
import { ImBin2 } from "react-icons/im"
import axios from "axios"
import { useRef, useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"
import { handleUpdateTodoList } from "@/app/utils/todoListAction"


export default function TodoListItem({ todoList }: { todoList: TodoList }) {
    const [isHidden, setIsHidden] = useState(false)
    const [formUpdate, setFormUpdate] = useState({ name: todoList.name, description: todoList.description });
    const nameRef = useRef<HTMLAnchorElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const handleDeleteTodoList = async () => {
        try {
            setIsHidden(true)
            await axios.delete(`api/todoLists/${todoList.id}`)
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleAction = async (formData: FormData) => {
        if (nameRef.current && descriptionRef.current) {
            nameRef.current.textContent = formData.get("name") as string
            descriptionRef.current.textContent = formData.get("description") as string
        }
        try {
            await handleUpdateTodoList(formData, todoList.id);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className={`w-56 h-64 p-5 rounded-xl bg-[#292935] hover:-translate-y-1 transition ${isHidden ? "hidden" : ""}`}>
            <div className="flex justify-between items-center">
                <h3 className="text-[#fc76a1] capitalize font-medium line-clamp-1 hover:text-[#e7497b]">
                    <Link href={`/?todolist_id=${todoList.id}`} ref={nameRef}>{todoList.name}</Link>
                </h3>
                <div className="flex space-x-2 items-center" title="Edit todo list">
                    <div className="hover:opacity-80 cursor-pointer flex items-center">
                        <Popover>
                            <PopoverTrigger>
                                <AiFillEdit size={20} color="#08C1F9" />
                            </PopoverTrigger>
                            <PopoverContent align="start">
                                <form action={handleAction} className="p-2 text-sm">
                                    <div className="flex space-x-2 items-center justify-between">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            value={formUpdate.name}
                                            type="text"
                                            name="name"
                                            placeholder="Todo list name..."
                                            className="px-2 py-1 bg-transparent w-[183px] text-white outline-none border border-white rounded-sm placeholder:text-white placeholder:opacity-40"
                                            onChange={(e) => setFormUpdate({ ...formUpdate, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <label htmlFor="name" className="text-white">
                                            Description
                                        </label>
                                        <textarea
                                            value={formUpdate.description || ""}
                                            placeholder="Your description"
                                            name="description"
                                            className="px-2 py-1 mt-2 scrollbar bg-transparent text-white outline-none border border-white rounded-sm placeholder:text-white placeholder:opacity-40"
                                            onChange={(e) => setFormUpdate({ ...formUpdate, description: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        className="capitalize bg-[#fc76a1] py-1 px-4 text-white rounded mt-2 hover:bg-[#fd6693] flex items-center"
                                        type="submit"
                                    >
                                        Change
                                    </button>
                                </form>
                            </PopoverContent>
                        </Popover>

                    </div>
                    <div className="hover:opacity-80 cursor-pointer" onClick={handleDeleteTodoList}>
                        <ImBin2 size={16} color="#FA3333" />
                    </div>
                </div>
            </div>
            <div className="mt-4 line-clamp-6">
                <p className="text-white" ref={descriptionRef}>{todoList.description}</p>
            </div>
        </div>
    )
}
