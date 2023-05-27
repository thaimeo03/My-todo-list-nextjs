"use client"
import Header from "../components/Header"
import { Toaster } from "../components/ui/toaster"
import useProtectedClient from "../hooks/useProtectedClient"
import { UserType } from "../types/user"
import { fetcher } from "../utils/fetcher"
import CollectionSide from "./components/CollectionSide"
import useSWR from "swr"

export default function Collections() {
    useProtectedClient()
    const { data: user }: { data: UserType } = useSWR("/api/user", fetcher)

    return (
        <div>
            <Header user={user} />
            <CollectionSide userId={user?.id as string} />
            <Toaster />
        </div>
    )
}
