/* eslint-disable @next/next/no-img-element */
"use client"
import { UserType } from "@/app/types/user"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { signOut } from "next-auth/react"

export default function User({ user }: { user: UserType }) {
    return (
        <div className="col-span-3 flex items-center space-x-4 ml-auto mr-5">
            <Popover>
                <PopoverTrigger>
                    <div className="flex space-x-3 cursor-pointer items-center">
                        <span className="text-white">{user?.name}</span>
                        {!user?.image ? (
                            <span className="w-9 h-9 rounded-full object-cover bg-orange-600 text-white text-xl grid place-items-center">
                                {user?.name[0]}
                            </span>
                        ) : (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <ul className="flex flex-col min-w-[150px] items-center">
                        <li className="p-2 text-sm cursor-pointer hover:bg-[#272732] w-full h-full text-center rounded-md">
                            Profile
                        </li>
                        <li
                            onClick={() => signOut()}
                            className="p-2 text-sm cursor-pointer hover:bg-[#272732] w-full h-full text-center rounded-md"
                        >
                            Logout
                        </li>
                    </ul>
                </PopoverContent>
            </Popover>
        </div>
    )
}
