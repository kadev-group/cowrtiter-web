import Link from 'next/link'
import Image from 'next/image'
import {useEffect, useState} from 'react'

import {hasCookie} from 'cookies-next'

import {ROUTE_LOGIN, ROUTE_REGISTER} from '../../constants'

const Header = () => {
    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        const isCookieExists = hasCookie('token')
        if (isCookieExists) {
            setAuth(true)
        }
        setAuth(false)
    }, [])

    const handleLogout = () => {
        console.log('log out button clicked')
    }

    if (auth) {
        return (
            <div className='h-14 shadow-md px-3 sm-px-0'>
                <header className='h-full container mx-auto flex justify-between items-center'>
                    <div className='w-auto h-auto'>
                        <Image width={150} height={40} src='/assets/images/logo.png' alt='cowriter logo'/>
                    </div>
                    <nav className='flex space-x-2 sm:space-x-4'>
                        <li className='list-none'>
                            <button
                                onClick={handleLogout}
                                className='rounded-md bg-green-600 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
                            >
                                Выйти
                            </button>
                        </li>
                    </nav>
                </header>
            </div>
        )
    }

    return (
        <div className='h-14 shadow-md px-3 sm-px-0'>
            <header className='h-full container mx-auto flex justify-between items-center'>
                <div>
                    <Image width={150} height={30} src='/assets/images/logo.png' alt='Ak cent logo'/>
                </div>
                <nav className='flex space-x-2 sm:space-x-4'>
                    <li className='list-none'>
                        <Link href={ROUTE_REGISTER} className='font-semibold text-xs sm:text-sm'>
                            Регистрация
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link
                            href={ROUTE_LOGIN}
                            className='rounded-md bg-primary px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
                        >
                            Войти
                        </Link>
                    </li>
                </nav>
            </header>
        </div>
    )
}

export default Header
