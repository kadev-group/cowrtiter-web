import {useState} from "react";
import {useRouter} from "next/navigation";

import api, {setAccessToken} from "@/utils/http";
import {errors, routes} from "@/constants/index";
import axios from "axios";

type IProps = {
    email: string;
    password: string;
    phone_number: string;
};

export const useSignUp = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSignUp = async (data: IProps) => {
        setLoading(true);
        try {
            const response = await api.post(routes.Auth.SignUp, data);
            if (response?.status === 200) {
                setAccessToken(response?.data?.tokens?.accessToken)
                router.push("/auth/login");
            }
            setLoading(false);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status
                if (status === axios.HttpStatusCode.Conflict) {
                    setError(errors.User.AlreadyExist.RU)
                } else if (status === axios.HttpStatusCode.BadRequest) {
                    setError(e.response?.data)
                }
                setLoading(false);
                return
            }
            setError(errors.InternalServerError.RU);
            setLoading(false);
        }
    };

    return {
        error,
        isLoading,
        onSignUp,
    };
};
