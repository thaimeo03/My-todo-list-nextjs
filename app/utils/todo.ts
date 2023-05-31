import { Work } from "@prisma/client"


export function sortByStatus(todoList: any) {
    const todoListStatusFalse = todoList?.filter((todo: Work) => todo.status === false)
    const todoListStatusTrue = todoList?.filter((todo: Work) => todo.status === true)

    if(todoListStatusFalse === undefined || todoListStatusTrue === undefined) return todoList
    
    const newTodoList = [...todoListStatusFalse, ...todoListStatusTrue]
    return newTodoList
}