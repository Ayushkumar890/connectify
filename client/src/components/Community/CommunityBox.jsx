import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CommunityBox = ({ community }) => {
    const [userId, setUserId] = useState('');
const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get("https://connectify-93bj.onrender.com/api/auth/profile", {
              withCredentials: true,
            });
    
            if (response.data && response.data.user._id) {
              setUserId(response.data.user._id);
            } else {
              console.error("Error fetching user data:", response.data.message);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);

      const handleJoinCommunity = async () => {
        try {
          const response = await axios.post(
            "https://connectify-93bj.onrender.com/community/join",
            { communityId: community._id, userId: userId },
            { withCredentials: true }
          );
      
          if (response.data.success) {
            navigate(`/community/${community._id}`);
          } else {
          }
        } catch (error) {
          console.error("Error joining community:", error);
          alert(error.response?.data?.message || "An error occurred while joining the community.");
        }
      };
      

  return (
    <div>
      <div className="p-4">
        <Link to={`/community/${community._id}`}>
        <button
          className="relative w-full md:w-[310px] h-[150px] bg-gradient-to-t from-[#6b1fce] via-[#6F00FF] to-[#5503c1] text-white rounded-2xl border-none outline-none cursor-pointer overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] group"
          onClick={handleJoinCommunity} // Call the function on click
        >
          <div className="absolute w-full left-0 top-1/2 transform -translate-y-1/2 text-[12px] uppercase tracking-wider transition-all duration-500 group-hover:-top-full">
            <div className="text-left p-4">
              <h2 className="text-lg font-bold">{community.name}</h2>
              <p className="py-5">{community.description}</p>
              {/* <p>{community._id}</p> */}
              <h2 className="text-[13px] text-black font-bold">{community.category}</h2>
            </div>
          </div>
          <div className="absolute w-full left-0 text-3xl font-bold top-[150%] transform -translate-y-1/2 uppercase tracking-wider transition-all duration-500 group-hover:top-1/2">
            Enter
          </div>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default CommunityBox;