import todoListIcon from "@/public/todo-list-icon/todo-list-icon.png"
import TodoListElement from "./TodoListElement"
import { TodoList } from "@prisma/client"
import useSWR from "swr"
import { fetcher } from "@/app/utils/fetcher"

export default function NavBar({ userId }: { userId: string }) {
    const { data: todoLists }: { data: TodoList[] | null } = useSWR(`/api/todoLists/${userId}`, fetcher)

    return (
        <nav className="col-span-2 bg-[#21212a] overflow-y-auto h-full scrollbar">
            <p className="mt-6 capitalize text-lg font-medium text-secondary px-9">Collections</p>
            <ul className="mt-3">
                {todoLists && todoLists.map((todoListItem, index) => (
                    <TodoListElement
                        key={todoListItem.id}
                        todoListId={todoListItem.id}
                        imageIcon={todoListIcon}
                        nameTodoList={todoListItem.name}
                    />
                ))}
            </ul>
        </nav>
    )
}
