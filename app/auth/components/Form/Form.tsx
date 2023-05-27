"use client"
import Input from "../Input"
import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { iceland } from "@/app/font"
import { signIn } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "../../../components/ui/use-toast"
import { FcGoogle } from "react-icons/fc"

export default function Form() {
    const router = useRouter()
    const { toast } = useToast()
    const [isLogin, setIsLogin] = useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleToggle = useCallback(() => {
        setIsLogin(!isLogin)
    }, [isLogin])

    const onSubmit = useCallback(
        async (data: any) => {
            if (isLogin) {
                try {
                    const res = await signIn("credentials", {
                        email: data.email,
                        password: data.password,
                        redirect: false,
                        callbackUrl: "/",
                    })
                    if (res?.error) throw new Error(res.error)
                    router.push("/")
                } catch (error: any) {
                    toast({
                        title: "Error",
                        description: "Incorrect email or password",
                        variant: "destructive",
                    })
                }
            } else {
                try {
                    await axios.post("/api/register", {
                        name: data.username,
                        password: data.password,
                        email: data.email,
                    })
                    await signIn("credentials", {
                        email: data.email,
                        password: data.password,
                        redirect: false,
                        callbackUrl: "/",
                    })
                    router.push("/")
                    toast({
                        title: "Successfully",
                    })
                } catch (error: any) {
                    toast({
                        title: "Error",
                        description: error.response.data.error,
                        variant: "destructive",
                    })
                }
            }
        },
        [isLogin, router, toast]
    )

    return (
        <div>
            <h1 className={`capitalize text-white text-5xl ${iceland.className}`}>
                {isLogin ? "Login" : "Register"}
            </h1>
            <div className="w-[110px] h-[1px] mt-2 bg-white"></div>
            <form className="mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
                {!isLogin && (
                    <Input
                        type="text"
                        label="username"
                        placeholder="Enter your username"
                        name="username"
                        register={register("username", {
                            required: "Username is required",
                            maxLength: {
                                value: 20,
                                message: "Username no more than 20 characters",
                            },
                        })}
                        error={errors.username}
                    />
                )}
                <Input
                    type="text"
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        },
                    })}
                    error={errors.email}
                />
                <Input
                    type="password"
                    label="password"
                    placeholder="Enter your password"
                    name="password"
                    register={register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be 6 characters or more",
                        },
                    })}
                    error={errors.password}
                />

                <button
                    type="submit"
                    className="flex items-center justify-center w-full bg-[#51cbe0] py-3 text-center mt-6 rounded font-semibold hover:opacity-90 text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-100"
                >
                    <span className="ml-2">{isLogin ? "Login" : "Register"}</span>
                </button>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    type="button"
                    className="bg-white w-full p-1 hover:opacity-90 mt-4 flex justify-center items-center py-3 gap-1 rounded font-semibold"
                >
                    <span>Sign in with Google</span>
                    <FcGoogle size={20} />
                </button>

                <p className="text-sm mt-2 text-white">
                    {isLogin ? "Do not have an account?" : "You are have account?"}
                    <span
                        onClick={handleToggle}
                        className="font-bold text-[#51cbe0] cursor-pointer"
                    >
                        {" "}
                        {isLogin ? "Register" : "Login"}{" "}
                    </span>
                    here
                </p>
            </form>
        </div>
    )
}
