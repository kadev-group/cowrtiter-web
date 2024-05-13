import Head from "next/head";
import {useSearchParams} from 'next/navigation'


import styles from "./google.module.scss";
import {useGoogleSignIn} from "@/hooks/useGoogleSIgnIn";
import React, {useEffect} from "react";
import Link from "next/link";
import {ErrorPage} from "@/components/ErrorPage";

const GoogleSignIn = () => {
    const searchParams = useSearchParams()
    const {error, onCallBack} = useGoogleSignIn();

    const state = searchParams.get('state');
    const token = searchParams.get('token');

    useEffect(() => {
        const state = searchParams.get('state');
        const token = searchParams.get('token');

        if (state !== null && token !== null) {
            onCallBack({state: state, token: token}).catch((e) => {
                console.log(e)
            })
        }
    }, [searchParams])

    return (
        <>
            <Head>
                <title>Вход через Google - cowiter </title>
            </Head>

            {error !== null &&
                <ErrorPage
                    StatusCode={409}
                    Message={"Что то пошло не так..."}
                    Description={error}/>
            }
        </>
    );
};

export default GoogleSignIn;

