import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import PopularCard from './PopularCard'
import axios from 'axios';
import CommunityBox from './Community/CommunityBox';

const Popular = () => {

    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://connectify-93bj.onrender.com/community", {
                    withCredentials: true,
                });

                // console.log("API response:", response.data);
                setCommunities(response.data.communities);
                // console.log("Communities data fetched:", response.data.communities);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);




    const location = useLocation()
    if (location.pathname === '/otp' || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/chat') return

    return (
        <>
            <div className='min-h-screen border-l-2 border-gray-700'>
                <div className='p-1 pt-3 sticky top-0 z-50 bg-black'>
                    <div className='w-[90%] z-50 mx-auto p-4 bg-zinc-800 rounded-full border-2 border-white text-center hover:bg-zinc-900'>
                        <h2 className='text-xl font-bold'>Popular</h2>
                    </div>
                </div>

                <div className='z-20'>
                    {communities.slice(0, 4).map((community) => (
                        <CommunityBox key={community._id} community={community} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Popular