import {useState} from "react";

import api from "@/utils/http";
import {errors, routes} from "@/constants/index";
import axios from "axios";
import {UserSession} from "@/utils/models/user";

type IProps = {
    isProtected: boolean;
}

export const useVerifySession = () => {
    const [user, setUser] = useState<UserSession | null>(null)
    const [error, setError] = useState<string | null>(null);

    const onSessionVerification = async () => {
        try {
            const response = await api.get(routes.Auth.Verify);
            if (response?.status === 200) {
                setUser(response.data)
                if (error !== null) {
                    setError(null)
                }
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status
                if (status === axios.HttpStatusCode.Unauthorized) {
                    if (e.response?.data.message === errors.Session.Expired) {
                        setError(errors.Session.Expired.RU)
                    } else {
                        setError(errors.Session.Unauthorized.RU)
                    }
                    return
                }
                setError(errors.InternalServerError.RU)
            }
        }
    };

    return {
        user,
        error,
        setError,
        onSessionVerification,
    };
};