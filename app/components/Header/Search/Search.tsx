export default function Search() {
    return (
        <form className="flex grid-cols-4 col-span-4">
            <input
                type="text"
                name="search"
                className="bg-inherit outline-none rounded-full py-2 w-[75%] px-4 text-secondary border border-secondary placeholder:opacity-50"
                placeholder="Find your work..."
            />
            <button type="submit" className="ml-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-secondary"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </button>
        </form>
    );
}
