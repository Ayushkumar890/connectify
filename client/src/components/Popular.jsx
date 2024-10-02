import React from 'react'
import { useLocation } from 'react-router-dom'
import PopularCard from './PopularCard'

const Popular = () => {
    const location = useLocation()
    if (location.pathname === '/otp'|| location.pathname === '/'  || location.pathname === '/login' || location.pathname === '/signup') return

    return (
        <>
        <div className='min-h-screen border-l-2 border-gray-700'>

            <div className='p-1 pt-3 sticky top-0 z-50 bg-black '>
                <div className='  w-[90%] z-50 mx-auto p-4 bg-zinc-800 rounded-full border-2 border-white text-center hover:bg-zinc-900 '>
                    <h2 className='text-xl font-bold '>Popular</h2>
                </div>
            </div>
            <div className='z-20'>

            <PopularCard/>
            <PopularCard/>
            <PopularCard/>
            <PopularCard/>
            </div>
        </div>
        </>
    )
}

export default Popular