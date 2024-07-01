
'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { register } from "module";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Varient = 'LOGIN' | "REGISTER"
const AuthForm = () => {
    const [variant, setVariant] = useState<Varient>('LOGIN')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            console.log("authenticated")
            router.push("/users")
        }
    }, [session?.status,router])

    const togggleVarianet = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            try {
                const registerResponse = await axios.post('/api/register', data);
                if(registerResponse){
                    signIn('credentials',data)
                }

            } catch (error) {
                toast.error("Something went wrong")
            } finally {
                setIsLoading(false)
            }

        }

        if (variant === 'LOGIN') {
            try {
                const credentialsResponse = await signIn('credentials', {
                    ...data,
                    redirect: false
                });

                if (credentialsResponse?.error) {
                    toast.error("Invalid credentials")
                };

                if (credentialsResponse?.ok) {
                    toast.success("Logged In");
                    router.push("/users");
                }


            } catch (error) {
                console.log("sign in credentials error", error)
                toast.error("Something went wrong");

            } finally {
                setIsLoading(false);
            }
        }
    }

    const socialAction = async (action: string) => {
        setIsLoading(true);
        try {
            const signInActionResponse = await signIn(action, { redirect: false });
            if (signInActionResponse?.error) {
                toast.error("Invalid credentials")
            }

            if (signInActionResponse?.ok) {
                toast.success("Logged In");
            }

        } catch (error) {
            console.log("sign in action error", error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
        // nextAuth social sign in
    }
    return (<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
            <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (

                    <Input label="Name" register={register} id="name" errors={errors} disabled={isLoading} />
                )}

                <Input label="Email address" register={register} id="email" errors={errors} type="email" disabled={isLoading} />
                <Input label="Password" register={register} id="password" errors={errors} type="password" disabled={isLoading} />
                <Button disabled={isLoading} fullWidth type="submit">{variant === 'LOGIN' ? 'Sign In' : "Register"}</Button>
            </form>
            <div className="mt-6">
                <div className="relative ">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                <div> {variant === 'LOGIN' ? "New to Messenger?" : "Alredy have an account?"}</div>
                <div onClick={togggleVarianet} className="underline cursor-pointer">{variant === 'LOGIN' ? "Create an account" : "Login"}</div>
            </div>
        </div>
    </div>);
}

export default AuthForm;