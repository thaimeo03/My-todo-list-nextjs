"use client"
import AuthModal from "./components/AuthModal"
import { Toaster } from "../components/ui/toaster"

export default function Page() {
    return (
        <div>
            <div className="bg-[url(../public/bg-login.avif)] min-h-screen bg-no-repeat bg-cover bg-center relative">
                <AuthModal />
                <Toaster />
            </div>
        </div>
    )
}
