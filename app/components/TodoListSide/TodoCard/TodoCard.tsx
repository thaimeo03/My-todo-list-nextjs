import { ImBin2 } from "react-icons/im"
import { AiFillEdit } from "react-icons/ai"

interface Props {
    isChecked: boolean;
    workName: string;
}

export default function TodoCard({ isChecked, workName }: Props) {
    return (
        <li className="p-3 bg-[#21212b] rounded-xl w-full flex mt-4 justify-between">
            <div className="flex space-x-3">
                <div>
                    {isChecked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-6 h-6 fill-[#fc76a1] cursor-pointer"
                        >
                            <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-6 h-6 fill-[#fc76a1] cursor-pointer"
                        >
                            <path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                        </svg>
                    )}
                </div>
                <p>{workName}</p>
            </div>
            <div className="flex space-x-2">
                <AiFillEdit size={20} cursor="pointer" color="#08C1F9" />
                <ImBin2 size={17} cursor="pointer" color="#FA3333" />
            </div>
        </li>
    );
}
