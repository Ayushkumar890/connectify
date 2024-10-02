import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';

const TotalPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/posts');
        console.log('Response Data:', response.data); // Log the response data for debugging
        if (response.data.success) {
          setPosts(response.data.data); // Set the posts from the 'data' property
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      }
    };

    fetchPosts();
  // }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display an error message if needed
  }

  // Reverse the posts array for display
  const reversedPosts = [...posts].reverse();

  return (
    <div className="w-full hide-scrollbar">
      <div className="py-1 md:py-4 px-2 md:px-4 w-full bg-black lg:py-2 lg:px-6">
        <div className="grid gap-8 w-full">
          {reversedPosts.length > 0 ? (
            reversedPosts.map((post) => <Blog key={post._id} post={post} />)
          ) : (
            <div className='flex justify-center pt-20 text-green'>No posts available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalPost;
