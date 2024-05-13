import axios from 'axios'
import {getCookie, setCookie} from 'cookies-next'

import {config} from '../../config'
import {errors, routes} from "@/constants/index";

const api = axios.create({
    withCredentials: true,
    baseURL: config.API
})

api.interceptors.request.use((config) => {
        const token = getAccessToken();
        console.log(token)
        if (token === null) return config;

        if (config.headers !== undefined) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    async (e) => {
        return Promise.reject(e)
    })

api.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        console.log(originalRequest._isRetry)
        if (
            originalRequest.url === routes.Auth.Verify &&
            error.response.status === 401 &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await api.put(routes.Auth.Refresh);
                if (response?.status === 200) {
                    setAccessToken(response?.data?.access_token)
                    window.location.reload()
                    return api(originalRequest)
                }
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    const status = e.response?.status
                    if (status === axios.HttpStatusCode.Unauthorized) {
                        return Promise.reject(e)
                    }
                    return Promise.reject(errors.InternalServerError.RU)
                }
            }
            return null
        }
        return Promise.reject(error)
    }
)

export const setAccessToken = (token: string) => {
    setCookie("access_token", token, {
        expires: new Date(new Date().getTime() + 30 * 60 * 1000),
    });
}

export const getAccessToken = (): string | null => {
    const cookie = getCookie("access_token");
    return typeof cookie === "string" ? cookie : null;
}

export default api
