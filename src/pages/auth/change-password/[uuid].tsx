import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import * as Yup from 'yup'
import { useFormik } from 'formik'

import api from '@/utils/http'
import { API_RESET_PASSWORD } from '@/constants/index'

import Input from '@/components/Input'
import Button from '@/components/Button'
import styles from './index.module.scss'

const ChangePassword = () => {
  const router = useRouter()
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (success !== null) {
      setTimeout(() => {
        router.push('/auth/login')
      }, 5000)
    }

    return () => {
      setError(null)
      setSuccess(null)
    }
  }, [success])

  const yupSchema = () =>
    Yup.object({
      password: Yup.string().min(6, 'Минимальное количество символов: 6').required('Заполните поле'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароль должен совпадать'),
    })

  const { errors, values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: yupSchema,
    onSubmit: ({ password }) => {
      const data = {
        password,
      }
      setError(null)
      handleChangePassword(data)
      resetForm()
    },
  })

  const handleChangePassword = async (values: object) => {
    try {
      const response = await api.post(`${API_RESET_PASSWORD}/${router?.query?.uuid}`, values)
      if (response?.status === 500) {
        setError('Произошла ошибка на стороне сервера')
      }
      if (response?.status === 200) {
        setSuccess('Пароль успешно изменен')
      }
    } catch (e) {
      setError('Что-то пошло не так')
    }
  }

  const fields = [
    {
      type: 'password',
      name: 'password',
      text: 'Новый пароль',
      placeholder: '*******',
      value: values.password,
      onChange: handleChange,
    },
    {
      type: 'password',
      name: 'confirmPassword',
      text: 'Повторите пароль',
      placeholder: '********',
      value: values.confirmPassword,
      onChange: handleChange,
    },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className='flex justify-center mb-10'>
            <Image width={150} height={30} src='/assets/images/logo.png' alt='Ak cent logo' />
          </div>
          <p className={styles.title}>Поменять пароль</p>
          {fields.map((field, idx) => {
            return (
              <div key={idx}>
                <Input
                  text={field.text}
                  name={field.name}
                  type={field.type}
                  className='text-md'
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && <div className='text-sm text-rose-500 font-medium'>{errors[field.name]}</div>}
              </div>
            )
          })}
          {error && <div className='text-sm text-rose-500 font-medium mt-4'>{error}</div>}
          {success && <div className='text-sm text-green-500 font-medium mt-4'>{success}</div>}
          <Button type='submit' text='Сохранить' />
        </div>
      </div>
    </form>
  )
}

export default ChangePassword
