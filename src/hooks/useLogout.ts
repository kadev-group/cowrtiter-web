import {useState} from 'react'
import {useRouter} from 'next/navigation'

import {deleteCookie} from 'cookies-next'

import api from '@/utils/http'
import {errors, routes} from '@/constants/index'
import axios from "axios";

export const useLogout = () => {
    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)

    const onLogout = async () => {
        try {
            setLoading(true)
            const response = await api.get(routes.Auth.Logout)
            if (response?.status === 200) {
                deleteCookie('access_token')
                router.push('/auth/login')
            }
            setLoading(false)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === axios.HttpStatusCode.Unauthorized) {
                    setError(errors.Session.Unauthorized.RU)
                    setLoading(false);
                    return
                }
            }
            setError(errors.InternalServerError.RU)
        }
    }

    return {
        error,
        onLogout,
    }
}
