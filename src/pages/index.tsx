import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Home = () => (
    <div>
        <Header/>
        <main className='grid h-screen min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div className='text-center'>
                <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Добро пожаловать!</h1>
                <p className='mt-6 text-base leading-7 text-gray-600'>Войдите в аккаунт для того чтобы продолжить.</p>
            </div>
        </main>
        <Footer/>
    </div>
)

export default Home
