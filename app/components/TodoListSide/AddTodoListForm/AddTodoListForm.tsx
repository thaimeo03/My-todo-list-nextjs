import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog"
import { useState } from "react"

export default function AddTodoListForm() {
    const [disable, setDisable] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length !== 0) {
            setDisable(false)
        }
        else setDisable(true)
    }

    return (
        <Dialog>
            <div className="mt-9 p-3 border border-gray-700 rounded-2xl flex items-center">
                <DialogTrigger asChild>
                    <button
                        className="bg-[#fc76a1] w-7 h-7 grid place-items-center rounded-xl cursor-pointer font-normal hover:bg-[#e7497b] disabled:bg-slate-500"
                        type="button"
                        disabled={disable}
                    >
                        +
                    </button>
                </DialogTrigger>
                <input
                    type="text"
                    className="ml-3 text-white placeholder:opacity-60 text-sm w-full outline-none bg-transparent focus:placeholder:opacity-0 transition"
                    placeholder="Add a task"
                    name="work"
                    onChange={handleChange}
                />
            </div>
            <DialogContent className="bg-[#181820]">
                <DialogHeader className="text-white">
                    <DialogTitle className="text-[#fc76a1] text-2xl">
                        New todo list
                    </DialogTitle>
                    <DialogDescription className="text-white">
                        A new plan, a new success. Good luck with your work
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
