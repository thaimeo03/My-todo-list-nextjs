import { Work } from "@prisma/client"


export function sortByStatus(todoList: any) {
    const todoListStatusFalse = todoList?.filter((todo: Work) => todo.status === false)
    const todoListStatusTrue = todoList?.filter((todo: Work) => todo.status === true)

    if(todoListStatusFalse === undefined || todoListStatusTrue === undefined) return todoList
    
    const newTodoList = [...todoListStatusFalse, ...todoListStatusTrue]
    return newTodoList
}

export function deadline(finishDate: Date | null) {
    const currentDate = new Date();
    const completionDate = new Date(finishDate as Date);    

    const oneDay: number = 24 * 60 * 60 * 1000;

    const deadline: number = Math.round((completionDate.getTime() - currentDate.getTime()) / oneDay);

    if(deadline < 0) return 0

    return deadline + 1
}