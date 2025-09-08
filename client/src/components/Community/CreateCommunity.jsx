import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users, FileText, Tag, Plus, ArrowLeft, Loader2 } from "lucide-react";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserLoading(true);
        const response = await axios.get("https://connectify-93bj.onrender.com/api/auth/profile", {
          withCredentials: true,
        });

        if (response.data && response.data.user.email) {
          setUser(response.data.user);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    if (user.role === "Visitor") {
      alert("Visitors are not allowed to create communities.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://connectify-93bj.onrender.com/community/create", {
        name,
        description,
        category,
        userId: user._id,
      });
      alert(response.data.message);
      navigate('/community');
    } catch (error) {
      console.error("Error creating community:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-green animate-spin" />
          <p className="text-zinc-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black to-zinc-900 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <button
            onClick={() => navigate('/community')}
            className="inline-flex items-center space-x-2 text-zinc-400 hover:text-green transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Communities</span>
          </button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full mb-6 border border-green/30">
            <Users className="w-8 h-8 lg:w-10 lg:h-10 text-green" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Create a Community
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Build a space where like-minded people can connect, share ideas, and grow together
          </p>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl shadow-2xl p-6 lg:p-8">
          {user && (
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 mb-8">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.image || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-green/50"
                />
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-zinc-400 text-sm">Creating as {user.role}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className=" text-sm font-semibold text-zinc-200 flex items-center space-x-2">
                <Users className="w-4 h-4 text-green" />
                <span>Community Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter a unique and memorable name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-green/50 focus:border-green transition-all duration-200 focus:bg-zinc-800 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className=" text-sm font-semibold text-zinc-200 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-green" />
                <span>Description</span>
              </label>
              <textarea
                placeholder="Describe what your community is about, its goals, and what members can expect..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full p-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-green/50 focus:border-green transition-all duration-200 focus:bg-zinc-800 outline-none resize-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className=" text-sm font-semibold text-zinc-200 flex items-center space-x-2">
                <Tag className="w-4 h-4 text-green" />
                <span>Category</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Yoga , Gym .... "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full p-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-green/50 focus:border-green transition-all duration-200 focus:bg-zinc-800 outline-none"
              />
            </div>

            {/* Guidelines */}
            <div className="bg-green/10 border border-green/20 rounded-xl p-4">
              <h3 className="text-green font-semibold mb-2 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Community Guidelines</span>
              </h3>
              <ul className="text-zinc-300 text-sm space-y-1">
                <li>• Choose a clear, descriptive name that reflects your community's purpose</li>
                <li>• Write a detailed description to help members understand the community</li>
                <li>• Select an appropriate category to help others discover your community</li>
                <li>• Ensure your community follows platform guidelines and policies</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/community')}
                className="flex-1 py-3 px-4 bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-zinc-600/50 hover:border-zinc-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !name.trim() || !description.trim() || !category.trim()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-green/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group disabled:hover:from-green disabled:hover:to-emerald-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Create Community</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <p className="text-zinc-500 text-sm">
            By creating a community, you agree to our community guidelines and terms of service
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;