import React, {useEffect} from 'react'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'

const Dashboard = (): JSX.Element => {

    useEffect(() => {
        
    }, [])

    return (
        <div className="flex h-screen w-screen">
            <Sidebar/>
            <Content className="h-full w-full">
                <div className='p-4'>
                    <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
                        <h1>TODO list of workspaces</h1>
                        <div className='grid grid-cols-3 gap-4 mb-4'>
                            <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
                                <p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
                            </div>
                            <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
                                <p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
                            </div>
                            <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
                                <p className='text-2xl text-gray-400 dark:text-gray-500'>+</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Content>
        </div>
    )
}

export default Dashboard
