import {useState} from "react";
import {useRouter} from "next/navigation";

import api, {setAccessToken} from "@/utils/http";
import axios from "axios";
import {errors, routes} from "@/constants/index";

type IProps = {
    email: string;
    password: string;
};

export const useSignIn = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSignIn = async (data: IProps) => {
        try {
            setLoading(true)
            const response = await api.post(routes.Auth.SignIn, data);
            if (response?.status === 200) {
                setAccessToken(response?.data?.tokens?.access_token)
                router.push("/workspaces");
            }
            setLoading(false)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status
                if (status === axios.HttpStatusCode.NotFound) {
                    setError(errors.User.NotFound.RU)
                } else if (status === axios.HttpStatusCode.Unauthorized) {
                    setError(errors.User.IncorrectPassword.RU)
                } else if (status === axios.HttpStatusCode.Conflict) {
                    setError(errors.User.MustAuthWGoogle.RU)
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
        isLoading,
        onSignIn,
    };
};
