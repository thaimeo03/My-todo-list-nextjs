import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function useProtectedClient() {
    const { data } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth")
        }
    })
    return data?.user
}