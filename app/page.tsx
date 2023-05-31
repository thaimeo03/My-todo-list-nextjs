"use client"
import Header from "./components/Header"
import NavBar from "./components/NavBar"
import TodoListSide from "./components/TodoListSide"
import useProtectedClient from "./hooks/useProtectedClient"
import useSWR from "swr"
import { fetcher } from "./utils/fetcher"
import { UserType } from "./types/user"
import { Toaster } from "./components/ui/toaster"

export default function Home() {
    useProtectedClient()
    const { data: user }: { data: UserType } = useSWR("/api/user", fetcher)

    return (
        <div>
            <Header user={user} />
            <main className="grid grid-cols-12 h-scroll">
                <NavBar userId={user?.id as string} />
                <TodoListSide />
            </main>
            <Toaster />
        </div>
    )
}
