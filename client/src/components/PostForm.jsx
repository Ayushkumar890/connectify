import React, { useState, useRef, useEffect } from "react";
import { TbCirclePlus } from 'react-icons/tb'; // Import the icon
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";

function PostForm() {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null); // State to store the user
  const formRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/posts'); // Adjust URL
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error, user);
      }
    };

    fetchUser();
  }, [user]);

  const handleAddPostClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    try {
      const response = await axios.post(
        'https://connectify-93bj.onrender.com/api/auth/posts',
        { title, description },
        { withCredentials: true }
      );
      console.log("Post created:", response.data);
      setShowForm(false);
      window.location.reload(true); // Reload from server (bypass cache)
    } catch (error) {
      console.error("Error creating post:", {
        message: error.message,
        response: error.response ? error.response.data : null,
        stack: error.stack,
      });
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation()
  if (params.communityId || location.pathname === '/otp' || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/profile' || location.pathname === '/chat' || location.pathname === '/community' || location.pathname === '/community/create' || location.pathname === 'community/:communityId' || location.pathname === '/dashboard' || location.pathname === '/search') return

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 z-40">
      <div>
        <button
          onClick={handleAddPostClick}
          className="overflow-hidden border rounded-full absolute bottom-6 right-0 text-white transition bg-green"

        >
          <TbCirclePlus
            className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-90" style={{ width: 50, height: 50 }}

          />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {
        showForm && (
          <section
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 p-4 flex justify-center items-center animate-in fade-in duration-300"
          >
            <div
              ref={formRef}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-in slide-in-from-bottom-4 scale-in-95"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green to-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Create New Post</h2>
                    <p className="text-zinc-400 text-sm">Share your thoughts with the community</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="group p-2 hover:bg-zinc-700/50 rounded-full transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-zinc-400 group-hover:text-red-400 transition-colors duration-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-zinc-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="What's on your mind?"
                    required
                    className="w-full p-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-green focus:border-green transition-all duration-200 focus:bg-zinc-800 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-zinc-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span>Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Share more details about your post..."
                    required
                    rows={4}
                    className="w-full p-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-green focus:border-green transition-all duration-200 focus:bg-zinc-800 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 px-4 bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-zinc-600/50 hover:border-zinc-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green to-green-600 hover:from-green hover:to-green text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-green flex items-center justify-center space-x-2 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Create Post</span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        )
      }
    </div >
  );
}

export default PostForm;