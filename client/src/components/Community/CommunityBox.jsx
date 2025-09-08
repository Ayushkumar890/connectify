import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Hash, ArrowRight, Calendar, Crown, Loader2 } from 'lucide-react';

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
    <div className="group">
      <div className="relative bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 border border-zinc-600/50 hover:border-green/50 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green/10 cursor-pointer overflow-hidden">
        
        {/* Header */}
        <div className="relative z-10 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green/20 to-green/30 rounded-full flex items-center justify-center border border-green/30">
                <Hash className="w-6 h-6 text-green" />
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green" />
                <span className="text-xs text-green font-medium">Community</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-green group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-green transition-colors duration-300">
            {community.name}
          </h2>
        </div>

        {/* Description */}
        <div className="relative z-10 mb-4">
          <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 group-hover:text-zinc-200 transition-colors duration-300">
            {community.description}
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-green" />
              <span className="text-xs text-green font-semibold">
                {community.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green" />
              <span className="text-xs text-green font-semibold">
                {community.members?.length || 0} members
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-600/30">
            <Link to={`/community/${community._id}`}>

              <button
                onClick={handleJoinCommunity}
                className="w-full py-3 px-4 bg-gradient-to-r from-green to-green hover:from-green hover:to-green text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-green/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group/btn transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
              >
                <span>Join Community</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green/5 to-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green to-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default CommunityBox;