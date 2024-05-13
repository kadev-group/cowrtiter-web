import React, {useState} from 'react'
import Image from 'next/image'

import * as Yup from 'yup'
import {useFormik} from 'formik'

import api from '@/utils/http'
import {ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_VERIFY_USER} from '@/constants/index'

import Link from '@/components/Link'
import Input from '@/components/Input'
import Button from '@/components/Button'
import styles from './index.module.scss'
import {useVerifyCode} from "@/hooks/useSendVerifyCode";

const ForgotPassword = () => {
    const {error, isLoading, success, onSendVerifyCode} = useVerifyCode()

    const yupSchema = () =>
        Yup.object({
            email: Yup.string().email('Не правильный формат почты').required('Заполните поле'),
        })

    const {errors, values, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yupSchema,
        onSubmit: async ({email}) => {
            await onSendVerifyCode({email})
            resetForm()
        },
    })

  
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.content}>
                <div className={styles.inner}>
                    <div className='flex justify-center mb-10'>
                        <Image width={150} height={30} src='/assets/images/logo.png' alt='Ak cent logo'/>
                    </div>
                    <p className={styles.title}>Восстановить пароль</p>
                    <Input
                        name='email'
                        type='email'
                        text={'Email'}
                        value={values.email}
                        onChange={handleChange}
                        placeholder='email@example.com'
                    />
                    {errors.email && <div className='text-sm text-rose-500 font-medium mt-4'>{errors.email}</div>}
                    {error && <div className='text-sm text-rose-500 font-medium mt-4'>{error}</div>}
                    {success && <div className='text-sm text-green-500 font-medium mt-4'>{success}</div>}
                    <Button type='submit' text='Сбросить'/>
                    <Link href={ROUTE_LOGIN} text={'Есть аккаунт?'}/>
                    <Link href={ROUTE_REGISTER} text={'Создать аккаунт'}/>
                </div>
            </div>
        </form>
    )
}

export default ForgotPassword
