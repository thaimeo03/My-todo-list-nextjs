import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface Props {
    imageIcon: StaticImageData
    isSelected: boolean
    nameTodoList: string
    todoListId: string
}

export default function TodoListElement({
    imageIcon,
    isSelected,
    nameTodoList,
    todoListId,
}: Props) {
    return (
        <Link
            href={`/?todolist_id=${todoListId}`}
            className={`py-3 ${isSelected && "bg-[#272732]"} cursor-pointer block`}
        >
            <div className="flex px-9 items-center">
                <Image src={imageIcon} alt="" width={32} height={32} />
                <p className="ml-2 text-white capitalize">{nameTodoList}</p>
            </div>
        </Link>
    )
}
