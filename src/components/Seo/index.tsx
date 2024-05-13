import Head from 'next/head'

export default function SEO() {
    return (
        <Head>
            <meta charSet='UTF-8'/>
            <meta name='author' content='cowriter'/>
            <meta name='copyright' content='cowriter'/>
            <meta name='keywords' content='cowriter'/>
            <meta name='description' content='cowriter'/>
            <meta name='og:image' content='/ogg.png'/>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
            <meta name='theme-color' content='#913BFF'/>
            <meta name='msapplication-navbutton-color' content='#913BFF'/>
            <meta name='apple-mobile-web-app-status-bar-style' content='#913BFF'/>
            <meta property='og:site_name' content='cowriter'/>
            <meta property='og:url' content='https://ak-cent.biz/'/>
            <meta property='og:type' content='website'/>
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta property='og:title' content='cowriter'/>
            {/*<meta http-equiv="Content-Security-Policy"*/}
            {/*      content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"/>*/}
            <link rel='icon' href='/favicon.ico'/>
        </Head>
    )
}
