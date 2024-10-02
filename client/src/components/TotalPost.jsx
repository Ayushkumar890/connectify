import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import ClipLoader from "react-spinners/ClipLoader";

const TotalPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      try {
        const response = await axios.get('http://localhost:3000/api/auth/posts');
        console.log('Response Data:', response.data); 
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
  }, []);

  if (error) {
    return <div className='text-red-500 text-center mt-20'>Error: {error}</div>;
  }

  const reversedPosts = [...posts].reverse();

  return (
    <>
      {loading ? (
        <div className='flex justify-center mt-20'>
          <ClipLoader 
            color={'#0d8007'} 
            loading={loading} 
            size={100} 
            aria-label="Loading Spinner" 
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="w-full hide-scrollbar">
          <div className="py-1 md:py-4 px-2 md:px-4 w-full bg-black lg:py-2 lg:px-6">
            <div className="grid gap-8 w-full">
              {reversedPosts.length > 0 ? (
                reversedPosts.map((post) => <Blog key={post._id} post={post} />)
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-500 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132a1.997 1.997 0 00-2.098 0l-3.197 2.132a2 2 0 00-.741 2.293l1.189 3.49c.276.813.98 1.365 1.829 1.463l2.61.313a2 2 0 002.192-1.737l.313-2.61c.098-.849.65-1.553 1.463-1.829l3.49-1.189a2 2 0 00.293-.741l-2.132-3.197a2 2 0 00-2.293-.741z" />
                  </svg>
                  <p className="text-lg font-semibold">Looks like no posts yet!</p>
                  <p className="text-sm text-green  cursor-pointer">Start creating one now!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalPost;
