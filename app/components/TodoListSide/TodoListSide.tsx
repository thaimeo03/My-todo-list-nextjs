"use client"
import TodoCard from "./TodoCard"
import { useSearchParams } from 'next/navigation'


export default function TodoListSide() {
    const searchParams = useSearchParams()
    const todoListId = searchParams.get("todolist_id")

    return (
        <div className="col-span-10 bg-[#181820]">
            {
                todoListId && (
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

                        <div className="mt-9 p-3 border border-gray-700 rounded-2xl flex items-center">
                            <button
                                type="button"
                                className="bg-[#fc76a1] w-7 h-7 grid place-items-center rounded-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed font-normal"
                                disabled={false}
                            >
                                +
                            </button>
                            <input
                                type="text"
                                className="ml-3 text-white placeholder:opacity-60 text-sm w-full outline-none bg-transparent"
                                placeholder="Add a task"
                                name="work"
                            />
                        </div>

                        <div className="mt-9">
                            <p className="capitalize">Task list</p>
                            <ul className="mt-4">
                                <TodoCard
                                    workName="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                                />
                                <TodoCard
                                    workName="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit ea illo eligendi inventore dolor enim nihil obcaecati culpa impedit id voluptate error neque fugiat perspiciatis doloribus, perferendis saepe vel recusandae"
                                />
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
