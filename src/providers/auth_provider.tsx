import React, {createContext, useEffect, useState} from 'react'
import {Loader} from '@/components/Loader'
import {useVerifySession} from "@/hooks/useVerifySession";
import {useRouter} from "next/router";
import {protectedRoutes} from "@/constants/index";
import {ErrorPage} from "@/components/ErrorPage";
import {getAccessToken} from "@/utils/http";
import {UserSession} from "@/utils/models/user";

type IAuthContext = {
    user: UserSession | null
}

const AuthContext = createContext<IAuthContext | null>(null)

const AuthProvider = ({children}) => {
    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(true)

    const {
        user,
        error,
        setError,
        onSessionVerification
    } = useVerifySession();

    const handleSession = async () => {
        const isProtectedRoute = protectedRoutes.includes(router.pathname)
        const token = getAccessToken();

        if (token === undefined || token === "") {
            if (isProtectedRoute) {
                await router.push('/auth/login')
            }
            setLoading(false)
            return
        }

        if (isProtectedRoute) {
            await onSessionVerification()
        } else {
            setError(null)
        }
        setLoading(false)
    }


    useEffect(() => {
        handleSession().catch();
    }, [router])

    // console.log(error)
    if (error !== null) {
        return <ErrorPage
            StatusCode={401}
            Message={"Что-то пошло не так..."}
            Description={error}/>
    }
    if (isLoading) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
