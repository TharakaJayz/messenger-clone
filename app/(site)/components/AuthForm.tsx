
'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { register } from "module";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Varient = 'LOGIN' | "REGISTER"
const AuthForm = () => {
    const [variant, setVariant] = useState<Varient>('LOGIN')
    const [isLoading, setIsLoading] = useState<boolean>(false)


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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        

        if (variant === 'REGISTER') {
            // axsios register
        }

        if (variant === 'REGISTER') {
            // nextAuth signIN
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        // nextAuth social sign in
    }
    return (<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
            <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (

                    <Input label="Name" register={register} id="name" errors={errors} />
                )}

                <Input label="Email address" register={register} id="email" errors={errors} type="email" />
                <Input label="Password" register={register} id="password" errors={errors} type="password" />
                <Button disabled = {isLoading}  fullWidth  type="submit">{variant === 'LOGIN' ? 'Sign In':"Register"}</Button>
            </form>
            <div className="mt-6">
                <div className="relative ">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"/>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <AuthSocialButton icon={BsGithub} onClick={()=> socialAction('github')}/>
                    <AuthSocialButton icon={BsGoogle} onClick={()=> socialAction('github')}/>
                </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                <div> {variant === 'LOGIN' ? "New to Messenger?":"Alredy have an account?"}</div>
                <div onClick={togggleVarianet} className="underline cursor-pointer">{variant === 'LOGIN' ? "Create an account":"Login"}</div>
            </div>
        </div>
    </div>);
}

export default AuthForm;