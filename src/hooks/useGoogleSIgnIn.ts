import {useState} from "react";
import {useRouter} from "next/navigation";
import {v4 as uuidv4} from "uuid";
import {errors, routes, TokenExpiresAt} from "../constants";
import axios from "axios";
import {setCookie} from "cookies-next";
import api from "@/utils/http";

type IProps = {
    state: string | null;
    token: string | null;
};

const keyState = "state"

export const useGoogleSignIn = () => {
    const router = useRouter();


    const [error, setError] = useState<string | null>(null);

    const onGoogleSignIn = async () => {
        const state = uuidv4();

        try {
            // console.log(routes.Auth.
            localStorage.setItem(keyState, state)
            const response = await api.get(routes.Auth.Google.Redirect(state))
            if (response.status === axios.HttpStatusCode.Ok) {
                const redirectURL = response.data.redirect_url
                router.push(redirectURL);
            }

        } catch (e) {
            console.log(e)
            localStorage.removeItem(keyState)
            if (axios.isAxiosError(e)) {
                if (e.response?.status === axios.HttpStatusCode.Conflict) {
                    setError(errors.User.AlreadyExist.RU);
                } else {
                    setError(errors.InternalServerError.RU);
                }
            }
        }
    };

    const onCallBack = async (data: IProps) => {
        const storedState = localStorage.getItem(keyState)

        if (
            (data.state === null) ||
            (data.token === null) ||
            (storedState !== null && storedState !== data.state)
        ) {
            setError("Не валидная авторизационная сессия.")
            return
        }

        setCookie("token", data.token, {
            expires: TokenExpiresAt(),
        });

        router.push("/workspaces");
    }

    return {
        error,
        onGoogleSignIn,
        onCallBack,
    };
};
