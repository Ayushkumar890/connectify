import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FetchMyPost from './FetchMyPost';
import ClipLoader from 'react-spinners/ClipLoader';

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch posts
  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/myposts', { withCredentials: true });
      if (response.data.success) {
        setPosts(response.data.data);
      } else {
        setError('Failed to fetch my posts');
      }
    } catch (error) {
      console.error('Error fetching my posts:', error);
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error fetching my posts');
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      await axios.delete(`https://connectify-93bj.onrender.com/api/auth/posts/${postId}`, { withCredentials: true });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting the post:', error);
      setError('Failed to delete the post.');
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (error) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-center p-8 rounded-2xl border-2 border-red-500/30 bg-red-500/5 max-w-md'>
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-red-400 mb-2'>Something went wrong!</h3>
          <p className='text-red-300 text-sm mb-4'>{error}</p>
          <button 
            onClick={fetchMyPosts}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const reversedPosts = [...posts].reverse();

  return (
    <div className="min-h-screen bg-black">
      {loading ? (
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <div className="relative mb-6">
            <ClipLoader
              color={'#10b981'}
              loading={loading}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            Outer ring animation
            <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-green-500/5 animate-pulse" />
          </div> 
          <div className="text-center">
            <h3 className="text-green-400 text-lg font-medium mb-2">Loading your posts...</h3>
            <p className="text-gray-500 text-sm animate-pulse">Getting your amazing content ready</p>
          </div>
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
                      animationDelay: `${index * 150}ms`,
                      animation: 'slideInRight 0.6s ease-out forwards'
                    }}
                  >
                    <FetchMyPost
                      post={post}
                      onDelete={deletePost}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="relative mb-8">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 -m-8">
                      <div className="w-32 h-32 rounded-full border border-green-500/10 animate-spin" style={{ animationDuration: '20s' }} />
                      <div className="absolute inset-4 w-24 h-24 rounded-full border border-green-500/5 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    </div>
                    
                    {/* Main icon container */}
                    <div className="relative z-10 w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 via-green-600/30 to-green-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-green-500/20">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-600/40 rounded-2xl flex items-center justify-center">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 max-w-md">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">
                        Your creative space awaits!
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        You haven't created any posts yet. This is your space to share ideas, thoughts, and connect with others.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                        <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Your First Post
                      </button>
                      
                      <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-500/20 hover:border-green-500/40 text-green-400 hover:text-green-300 rounded-xl transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MyPost;