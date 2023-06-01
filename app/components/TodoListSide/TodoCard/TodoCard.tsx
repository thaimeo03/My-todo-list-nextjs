"use client"
import { ImBin2 } from "react-icons/im"
import { AiFillEdit } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet"

import { Calendar } from "../../ui/calendar"
import { useCallback, useRef, useState } from "react"
import axios from "axios"
import { mutate } from "swr"
import { deadline } from "@/app/utils/todo"

interface Props {
    workName: string;
    todoId: string;
    status: boolean;
    finishDate?: Date;
}

export default function TodoCard({ workName, todoId, status, finishDate }: Props) {
    const [name, setName] = useState(workName)
    const [isChecked, setIsChecked] = useState(status)
    const [isHidden, setIsHidden] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const nameRef = useRef<HTMLParagraphElement>(null)

    const deadlineTodo = deadline(finishDate as Date)

    const handleToggle = useCallback(async () => {
        setIsChecked(!isChecked)
        try {
            await axios.put(`/api/status/${todoId}`, {
                status: !isChecked
            })
            mutate(`/api/todo/${todoId}`)
        } catch (error: any) {
            console.log(error.message);
        }
    }, [isChecked, todoId])

    const handleDeleteTodo = async () => {
        try {
            setIsHidden(true)
            await axios.delete(`/api/todo/${todoId}`)
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSaveChange = async () => {
        try {
            if (nameRef.current?.innerText) nameRef.current.innerText = name
            axios.put(`/api/todo/${todoId}`, { name, finishDate: date?.toISOString() })
            mutate(`/api/todo/${todoId}`)
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className={`mt-4 ${isHidden ? "hidden" : ""}`}>
            <span className="text-xs text-blue-500">
                {(deadlineTodo !== null && isChecked === false) && (deadlineTodo >= 0 ? `Your deadline is ${deadlineTodo} day${deadlineTodo > 1 ? "s" : ""} away` : "Expired")}
                {isChecked && "Completed"}
            </span>
            <li className={`p-3 ${isChecked ? "bg-[#4821d4]" : "bg-[#21212b] "} rounded-xl w-full flex justify-between`}>
                <div className="flex space-x-3">
                    <div>
                        {isChecked ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="w-6 h-6 fill-[#fc76a1] cursor-pointer"
                                onClick={handleToggle}
                            >
                                <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="w-6 h-6 fill-[#fc76a1] cursor-pointer"
                                onClick={handleToggle}
                            >
                                <path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                            </svg>
                        )}
                    </div>
                    <p className="max-w-[95%]" ref={nameRef}>{workName}</p>
                </div>
                <div className="flex space-x-2">
                    <Sheet>
                        <SheetTrigger>
                            <AiFillEdit size={18} cursor="pointer" color="white" />
                        </SheetTrigger>
                        <SheetContent className="bg-[#21212b] border-black" size={"sm"}>
                            <SheetHeader>
                                <SheetTitle className="text-[#fc76a1]">Edit your todo</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8">
                                <div className="flex space-x-3 items-center">
                                    <label htmlFor="name" className="text-white text-sm">Name</label>
                                    <input type="text" placeholder="Todo name" name="name" className="bg-transparent text-white text-sm border border-white placeholder:opacity-50 px-2 py-1 placeholder:text-sm" value={name} onChange={handleChangeName} />
                                </div>

                                <div className="mt-6">
                                    <p className="text-white">Your deadline</p>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border w-fit mt-3 text-white"
                                    />
                                    <button type="button" className="px-3 py-1 text-white text-sm border border-[#fc76a1] rounded hover:bg-[#fc76a1] transition mt-3" onClick={handleSaveChange}>Save change</button>

                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <BsThreeDots />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#21212b]">
                            <DropdownMenuItem className="flex items-center space-x-3 hover:bg-[#272732]" onClick={handleDeleteTodo}>
                                <ImBin2 size={16} cursor="pointer" color="white" />
                                <p className="cursor-pointer text-white w-full">Delete</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </li>
        </div>
    );
}
