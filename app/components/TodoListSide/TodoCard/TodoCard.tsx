"use client"
import { ImBin2 } from "react-icons/im"
import { AiFillEdit } from "react-icons/ai"
import { BsThreeDots, BsCalendarDate } from "react-icons/bs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Calendar } from "../../ui/calendar"
import { useCallback, useState } from "react"
import { Popover, PopoverTrigger } from "../../ui/popover"
import axios from "axios"
import { mutate } from "swr"

interface Props {
    workName: string;
    todoId: string;
    status: boolean
}

export default function TodoCard({ workName, todoId, status }: Props) {
    const [isChecked, setIsChecked] = useState(status)
    const [isHidden, setIsHidden] = useState(false)

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

    return (
        <li className={`p-3 ${isChecked ? "bg-[#4821d4]" : "bg-[#21212b] "} ${isHidden ? "hidden" : ""} rounded-xl w-full flex mt-4 justify-between`}>
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
                <p className="max-w-[95%]">{workName}</p>
            </div>
            <div className="flex space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#21212b]">
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-[#272732]">
                            <AiFillEdit size={22} cursor="pointer" color="white" />
                            <p className="cursor-pointer text-white w-full">Edit</p>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-500" />
                        <DropdownMenuItem className="flex items-center space-x-3 hover:bg-[#272732]" onClick={handleDeleteTodo}>
                            <ImBin2 size={16} cursor="pointer" color="white" />
                            <p className="cursor-pointer text-white w-full">Delete</p>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </li>
    );
}
