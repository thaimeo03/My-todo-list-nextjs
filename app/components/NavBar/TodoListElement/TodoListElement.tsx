"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Props {
    imageIcon: StaticImageData
    nameTodoList: string
    todoListId: string
}

export default function TodoListElement({
    imageIcon,
    nameTodoList,
    todoListId,
}: Props) {
    const searchParams = useSearchParams()


    return (
        <Link
            href={`/?todolist_id=${todoListId}`}
            className={`py-3 ${(searchParams.get("todolist_id") === todoListId) && "bg-[#272732]"} cursor-pointer block`}
        >
            <div className="flex px-9 items-center">
                <Image src={imageIcon} alt="" width={32} height={32} />
                <p className="ml-2 text-white capitalize">{nameTodoList}</p>
            </div>
        </Link>
    )
}
