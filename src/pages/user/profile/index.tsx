import { useEffect, useState } from 'react'

import { Avatar } from 'evergreen-ui'
import { hasCookie } from 'cookies-next'

import api from '../../../utils/http'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'
import { User } from '@/utils/models/user'
import { ROUTE_REFRESH_TOKEN } from '../../../constants'

// import styles from './index.module.scss'

const UserProfile = () => {
  const [user, setUser] = useState<any>()
  // const isTokenExists = hasCookie('token')

  // if (isTokenExists) {
  //   // fetchUser()
  // }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(ROUTE_REFRESH_TOKEN, {
          withCredentials: true,
        })
        if (response?.status === 200) {
          setUser(response.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchUser()
  }, [])

  return (
    <>
      <Sidebar />
      <Content>
        <div className='p-4 sm:ml-64 lg:mt-14'>
          <Avatar
            src='https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg'
            name='Alan Turing'
            size={40}
          />
          <p>Добро пожаловать</p>
          <p>Ценовая Группа: {user?.group_name}</p>
          <p>Почта: {user?.email}</p>
          <p>Роль: {user?.role_name}</p>
          <p>Телефон: {user?.phone_number}</p>
        </div>
      </Content>
    </>
  )
}

export default UserProfile
