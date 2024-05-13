import {useState} from "react";

import api from "@/utils/http";
import axios from "axios";
import {errors, routes} from "@/constants/index";

type IProps = {
    email: string;
};

export const useVerifyCode = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null)

    const onSendVerifyCode = async (data: IProps) => {
        try {
            setLoading(true)
            const response = await api.put(routes.Auth.User.SendVerifyCode, data)
            if (response?.status === 200) {
                setSuccess('Проверьте Вашу почту, мы отправили вам письмо')
            }
            setLoading(false)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status
                if (status === axios.HttpStatusCode.BadRequest) {
                    setError(errors.BadRequest.RU)
                } else if (status === axios.HttpStatusCode.Unauthorized) {
                    setError(errors.Session.Unauthorized.RU)
                }
                setLoading(false)
                return
            }
            setLoading(false)
            setError(errors.InternalServerError.RU)
        }
    };


    return {
        error,
        success,
        isLoading,
        onSendVerifyCode,
    };
};