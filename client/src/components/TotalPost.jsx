import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import ClipLoader from "react-spinners/ClipLoader";

const TotalPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/profile', { withCredentials: true });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/posts');
        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    fetchCurrentUser();
  }, []);

  if (error) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center p-8 rounded-2xl border-2 border-red-500/30 bg-red-500/5'>
          <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className='text-xl font-bold text-red-400 mb-2'>Oops! Something went wrong</h3>
          <p className='text-red-300'>{error}</p>
        </div>
      </div>
    );
  }

  const reversedPosts = [...posts].reverse();

  return (
    <div className="min-h-screen bg-black">
      {loading ? (
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <div className="relative">
            <ClipLoader
              color={'#10b981'}
              loading={loading}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-pulse" />
          </div>
          <p className="text-green-400 mt-4 animate-pulse">Loading amazing posts...</p>
        </div>
      ) : (
        <div className="w-full">

          {/* Posts Container */}
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="space-y-8">
              {reversedPosts.length > 0 ? (
                reversedPosts.map((post, index) => (
                  <div
                    key={post._id}
                    className="transform transition-all duration-500 hover:scale-[1.02]"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <Blog post={post} currentUser={currentUser} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="relative mb-8">
                    {/* Animated background circles */}
                    <div className="absolute inset-0 -m-4">
                      <div className="w-24 h-24 rounded-full border-2 border-green-500/20 animate-ping" />
                      <div className="absolute inset-2 w-20 h-20 rounded-full border border-green-500/10 animate-pulse" />
                    </div>
                    
                    {/* Icon */}
                    <div className="relative z-10 w-16 h-16 mx-auto bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-2xl flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className="w-8 h-8 text-green-400"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      No posts yet!
                    </h3>
                    <p className="text-gray-400 max-w-md">
                      Be the first to share something amazing with the community. 
                      Your thoughts matter!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group">
                      <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="font-medium">Start creating now!</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TotalPost;