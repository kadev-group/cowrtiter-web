import type {AppProps} from 'next/app'
import {AuthProvider} from '@/providers/auth_provider'
import SEO from '../components/Seo'
import '../../styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <SEO/>
            <Component {...pageProps} />
        </AuthProvider>
    )
}
