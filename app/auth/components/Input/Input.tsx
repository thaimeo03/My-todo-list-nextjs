interface Props {
    label: string;
    placeholder: string;
    type: string;
    name: string;
    register: any;
    error: any;
}

export default function Input({ label, placeholder, type, name, register, error }: Props) {
    return (
        <div className="mt-5">
            <label className="capitalize block text-white">{label}</label>
            <input
                type={type}
                className="mt-1 bg-none bg-transparent outline-none border border-[#ccc] placeholder:text-gray-300 placeholder:opacity-40 rounded-md p-3 text-lg w-full text-white"
                placeholder={placeholder}
                name={name}
                {...register}
            />
            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
        </div>
    );
}
