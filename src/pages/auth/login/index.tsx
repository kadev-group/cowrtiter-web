import Head from "next/head";
import Image from "next/image";

import * as Yup from "yup";
import {useFormik} from "formik";
import {Paragraph} from "evergreen-ui";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import {useSignIn} from "@/hooks/useSignIn";
import {ROUTE_RESET_PASSWORD, ROUTE_REGISTER} from "@/constants/index";

import styles from "./index.module.scss";
import GoogleIcon from "@/icons/icon-google.svg";
import {useGoogleSignIn} from "@/hooks/useGoogleSIgnIn";
import React, {useState} from "react";
import {Loader} from "@/components/Loader";

const SignIn = () => {
    const {error, isLoading, onSignIn} = useSignIn();
    const {onGoogleSignIn} = useGoogleSignIn();

    const yupSchema = () =>
        Yup.object({
            email: Yup.string()
                .email("Не правильный формат почты")
                .required("Заполните поле"),
            password: Yup.string()
                .min(8, "Минимальное количество символов: 8")
                .required("Заполните поле"),
        });

    const {errors, values, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yupSchema,
        onSubmit: async ({email, password}) => {
            const data = {
                email,
                password,
            };
            await onSignIn(data)
        },
    });

    const handleGoogleSignIn = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        await onGoogleSignIn();
    };

    const fields = [
        {
            email: "email",
            type: "email",
            name: "email",
            text: "Email",
            placeholder: "email@example.com",
            value: values.email,
            onChange: handleChange,
        },
        {
            type: "password",
            name: "password",
            text: "Пароль",
            placeholder: "*******",
            value: values.password,
            onChange: handleChange,
        },
    ];

    return (
        <>
            <Head>
                <title>Вход - cowriter</title>
            </Head>
            <div className={styles.content}>
                <form onSubmit={handleSubmit} className={styles.inner}>
                    <div className="flex justify-center mb-10">
                        <Image
                            width={150}
                            height={30}
                            src="/assets/images/logo.png"
                            alt="cowriter logo"
                        />
                    </div>
                    <p className={styles.title}>Вход</p>

                    {fields.map((field, idx) => {
                        return (
                            <div key={idx}>
                                <Input
                                    text={field.text}
                                    name={field.name}
                                    type={field.type}
                                    className="text-md"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder={field.placeholder}
                                />
                                {errors[field.name] && (
                                    <div className="text-sm text-rose-500 font-medium mt-1">
                                        {errors[field.name]}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {error && (
                        <div className="mt-4">
                            <Paragraph color="red">{error}</Paragraph>
                        </div>
                    )}


                    <div className='w-full mt-4'>
                        {isLoading ?
                            <Loader height="h-10"/> :
                            <Button type="submit" text="Войти"/>
                        }
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 font-semibold">
                                OR Continue with
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        text="Google"
                        icon={<GoogleIcon/>}
                        onClick={handleGoogleSignIn}
                    />

                    <Link href={ROUTE_RESET_PASSWORD} text={"Забыли пароль?"}/>
                    <Link href={ROUTE_REGISTER} text={"Создать аккаунт"}/>
                </form>
            </div>
        </>
    );
};

export default SignIn;
