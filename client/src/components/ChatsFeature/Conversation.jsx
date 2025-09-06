import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Conversation = ({ data, currentUserId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            // console.log(currentUserId);
            const otherUserId = data.members.find((id) => id !== currentUserId); // Get the other person's ID

            try {
                const response = await axios.post(
                    'https://connectify-93bj.onrender.com/api/auth/user',
                    { userId: otherUserId },
                    { withCredentials: true }
                );
                setUserData(response.data.user);
                // console.log('User data fetched:', response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [data, currentUserId]);

    return (
        <div className="conversation">
            <div>
                <div className='flex gap-5'>
                    <img className='w-12 h-12 rounded-full' src={userData?.image} alt="avatar" />
                    <div>

                        <h3>{userData?.name}</h3>
                        <span className='text-gray-500 text-xs'>Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conversation;