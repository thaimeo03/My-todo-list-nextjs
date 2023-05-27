import { UserType } from "@/app/types/user"
import NavPage from "./NavPage"
import Search from "./Search"
import User from "./User"

export default function Header({ user }: { user: UserType }) {
    return (
        <header className="grid grid-cols-12 content-center bg-[#21212b] px-9 py-5 border-b shadow-lg border-b-neutral-900">
            <NavPage />
            <Search />
            <User user={user} />
        </header>
    )
}
