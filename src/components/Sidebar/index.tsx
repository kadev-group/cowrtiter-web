import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import {useRouter} from 'next/router'

import {useLogout} from '@/hooks/useLogout'
import {LogoutSvg, ProfileSvg, WorkspacesSVG} from "@/components/Sidebar/svgs";
import MenuBar from "@/icons/menu-bar.svg"
import styles from "./index.module.scss";

const Sidebar = () => {
    const router = useRouter()
    const {onLogout} = useLogout()
    const [openSidebar, setOpenSidebar] = useState<boolean>(true)

    const linksClassNames = (path: string): string => {
        return `flex items-center p-2 rounded-lg ${
            router.pathname === path ? 'bg-gray-700 text-gray-100' : 'text-gray-300'
        } hover:bg-gray-700`
    }
    // TODO open-side-bar
    return (
        <div>
            <aside
                id='default-sidebar'
                className={`z-40 h-screen 
               ${openSidebar ? 'w-64' : 'w-16'}
                transition-transform sm:translate-x-0 translate-x-0 `}
            >
                <div className={styles.main}>
                    <div className='mb-10 flex justify-start items-center'>
                        {openSidebar &&
                            <Link href='/workspaces' className='flex items-center mr-10 space-x-2'>
                                <Image width={144} height={42} src='/assets/images/logo.png' alt='cowriter logo'/>
                            </Link>}
                        <div className="flex items-center h-full w-10" onClick={() => {
                            setOpenSidebar(!openSidebar)
                        }}>
                            <MenuBar/>
                        </div>
                    </div>
                    <ul className='space-y-2 font-medium'>
                        <li>
                            <Link href='/workspaces' className={linksClassNames("/workspaces")}>
                                <WorkspacesSVG/>
                                {openSidebar && <span className='ml-3'>Мои пространства</span>}
                            </Link>
                        </li>
                        <li>
                            <Link href='/user/profile' className={linksClassNames('/user/profile')}>
                                <ProfileSvg/>
                                {openSidebar && <span className='flex-1 ml-3 whitespace-nowrap'>Профиль</span>}
                            </Link>
                        </li>
                        <li>
                            <button className={linksClassNames("")} onClick={onLogout}>
                                <LogoutSvg/>
                                {openSidebar && <span className='ml-3 whitespace-nowrap'>Выход</span>}
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
