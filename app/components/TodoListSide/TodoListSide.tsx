"use client"
import useSWR from "swr"
import AddTodoListForm from "./AddTodoListForm"
import TodoCard from "./TodoCard"
import { useSearchParams } from 'next/navigation'
import { fetcher } from "@/app/utils/fetcher"
import { Work } from "@prisma/client"
import { sortByStatus } from "@/app/utils/todo"

export default function TodoListSide() {
    const searchParams = useSearchParams()
    const todoListId = searchParams.get("todolist_id")
    const { data: todoList } = useSWR(`/api/todo/${todoListId}`, fetcher)
    const newTodoList = sortByStatus(todoList)

    return (
        <div className="col-span-10 bg-[#181820]">
            {
                (todoListId && todoList) && (
                    <div className="w-[60%] mx-auto mt-10 text-white">
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold"></p>
                            <div className="cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <AddTodoListForm todoListId={todoListId} />

                        <div className="mt-9">
                            <p className="capitalize">Task list</p>
                            <ul className="mt-4">
                                {
                                    newTodoList?.map((todo: Work) => (
                                        <TodoCard
                                            key={todo.id}
                                            workName={todo.name}
                                            todoId={todo.id}
                                            status={todo.status}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
