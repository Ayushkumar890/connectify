import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCommunity from "./MyCommunity";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Users, Plus, Crown, Loader2, AlertCircle, Sparkles } from "lucide-react";

const AdminDashboard = () => {
  const [userId, setUserId] = useState("");
  const [myCommunities, setMyCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState('');
  const [user, setUser] = useState(null);

  // Fetch user ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://connectify-93bj.onrender.com/api/auth/profile",
          {
            withCredentials: true,
          }
        );

        if (response.data && response.data.user._id) {
          setUserId(response.data.user._id);
          setRole(response.data.user.role);
          setUser(response.data.user);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Run only once on mount

  // Fetch communities when userId changes
  useEffect(() => {
    const fetchMyCommunities = async () => {
      if (!userId) return; // Wait until userId is available

      setLoading(true);
      setError("");
      try {
        const response = await axios.post(
          "https://connectify-93bj.onrender.com/community/myCommunities",
          { userId: userId },
          { withCredentials: true }
        );

        setMyCommunities(response.data.communities || []);
      } catch (err) {
        console.error("Error fetching my communities:", err);
        setError(err.response?.data?.message || "Failed to fetch communities.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCommunities();
  }, [userId]); // Re-run whenever userId changes

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-green animate-spin" />
          <p className="text-zinc-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-red-400 font-semibold">Error</h3>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          {/* User Welcome */}
          <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 border border-zinc-700/50 rounded-2xl p-6 lg:p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={user?.image || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} 
                    alt="Profile" 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-3 border-green/50 shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green to-emerald-600 rounded-full flex items-center justify-center border-2 border-zinc-800">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.name}!
                  </h1>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-green/20 text-green rounded-full text-sm font-medium border border-green/30">
                      {role}
                    </span>
                    <span className="text-zinc-400 text-sm">
                      {myCommunities.length} {myCommunities.length === 1 ? 'Community' : 'Communities'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Create Community Button */}
              <Link 
                to="/community/create" 
                className="group bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green/25 flex items-center space-x-2 transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                <span>Create Community</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 border border-zinc-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center border border-green/30">
                  <Users className="w-6 h-6 text-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{myCommunities.length}</p>
                  <p className="text-zinc-400 text-sm">Communities Created</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 border border-zinc-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <Crown className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{role}</p>
                  <p className="text-zinc-400 text-sm">Account Type</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-700/50 border border-zinc-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Active</p>
                  <p className="text-zinc-400 text-sm">Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Communities Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green/20 rounded-full flex items-center justify-center border border-green/30">
                <Users className="w-4 h-4 text-green" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Communities</h2>
            </div>
            
            {myCommunities.length > 0 && (
              <Link 
                to="/community/create" 
                className="text-green hover:text-emerald-400 transition-colors duration-200 text-sm font-medium flex items-center space-x-1 group"
              >
                <span>Create Another</span>
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              </Link>
            )}
          </div>

          {myCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {myCommunities.map((community, index) => (
                <div 
                  key={community._id}
                  className="animate-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MyCommunity community={community} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto border border-green/30">
                  <Users className="w-16 h-16 text-green" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="space-y-4 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white">Create Your First Community</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Start building your own community where people can connect, share ideas, and grow together.
                </p>
                
                <Link 
                  to="/community/create" 
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green/25 transform hover:scale-105 active:scale-95 mt-6"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Community</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;