import Head from 'next/head'
import {FC, useState} from 'react'
import Image from 'next/image'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import InputMask from 'react-input-mask'

import Link from '@/components/Link'
import Input from '@/components/Input'
import Button from '@/components/Button'

import {ROUTE_LOGIN} from '@/constants/index'

import styles from './register.module.scss'
import {useSignUp} from '@/hooks/useSignUp'
import {Loader} from "@/components/Loader";

const Register: FC = () => {
    const {error, isLoading, onSignUp} = useSignUp()

    const yupSchema = () =>
        Yup.object({
            email: Yup.string().email('Не правильный формат почты').required('Заполните поле'),
            phone_number: Yup.string()
                .test('len', 'Не правильный формат телефона', (val: any) => {
                    const inputLength = val.replace(/-|_[\(\)]\s/g, '').length
                    return inputLength === 16
                })
                .required('Заполните поле'),
            password: Yup.string()
                .min(8, 'Минимальное количество символов: 8')
                .max(48, 'Максимальное количество символов: 48')
                .required('Заполните поле'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароль должен совпадать'),
        })

    const {errors, values, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            email: '',
            phone_number: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: yupSchema,
        onSubmit: async ({email, phone_number, password}) => {
            const data = {
                email,
                password,
                phone_number,
            }
            await onSignUp(data)
        },
    })

    const fields = [
        {
            name: 'email',
            email: 'email',
            text: 'Email',
            placeholder: 'email@example.com',
            value: values.email,
            onChange: handleChange,
        },
        {
            name: 'phone_number',
            text: 'Телефон',
            placeholder: '+7 (778) 672 96 94',
            value: values.phone_number,
            onChange: handleChange,
        },
        {
            type: 'password',
            name: 'password',
            text: 'Пароль',
            placeholder: '********',
            value: values.password,
            onChange: handleChange,
        },
        {
            type: 'password',
            name: 'confirmPassword',
            text: 'Повторите пароль',
            placeholder: '*********',
            value: values.confirmPassword,
            onChange: handleChange,
        },
    ]

    return (
        <>
            <Head>
                <title>Регистрация - Ak Cent Microsystems</title>
            </Head>
            <div className={styles.content}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inner}>
                        <div className='flex justify-center mb-10'>
                            <Image width={150} height={30} src='/assets/images/logo.png' alt='cowriter logo'/>
                        </div>
                        <p className={styles.title}>Регистрация</p>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                {fields?.map((field, idx) => {
                                    return (
                                        <div key={idx} className='flex flex-col'>
                                            {field.name === 'phone_number' ? (
                                                <div className='flex flex-col'>
                                                    <label
                                                        className='text-sm font-normal mt-2 mb-1'>{field.text}</label>
                                                    <InputMask
                                                        {...field}
                                                        mask='+7 (999) 999-99-99'
                                                        maskChar={null}
                                                        className='rounded border border-gray-300 text-sm h-8 px-3 focus:shadow focus:ring-1 outline-none transition-shadow'
                                                    />
                                                </div>
                                            ) : (
                                                <Input
                                                    type={field.type}
                                                    name={field.name}
                                                    text={field.text}
                                                    value={field.value}
                                                    className='text-sm'
                                                    onChange={field.onChange}
                                                    placeholder={field.placeholder}
                                                />
                                            )}
                                            {errors[field.name] && (
                                                <div
                                                    className='text-sm text-rose-500 font-medium mt-1'>{errors[field.name]}</div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {error && <div className='mt-4 text-sm text-rose-500 font-medium'>{error}</div>}
                        {/*{isSucceed &&*/}
                        {/*    <div className='mt-4 text-sm text-green-500 font-medium'>Успех! Мы вас сейчас перенесем на*/}
                        {/*        главную страницу...</div>}*/}
                        <div className='w-full mt-4'>
                            {isLoading ?
                                <Loader height="h-10"/> :
                                <Button type='submit' text='Создать'/>
                            }
                        </div>
                        <Link href={ROUTE_LOGIN} text={'Уже есть аккаунт?'}/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
