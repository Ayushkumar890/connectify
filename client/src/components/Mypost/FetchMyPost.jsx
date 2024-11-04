import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TbTrash } from 'react-icons/tb';

const FetchMyPost = ({ post, onDelete }) => {
  const [Role, setRole] = useState('');

  // Fetch user data only once when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });
        console.log('API response:', response.data.user.role); // Debugging: log the full response
        if (response.data && response.data.user.role) {
          setRole(response.data.user.role);
        } else {
          console.error('Error fetching user data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures it only runs once

  return (
    <article className="p-6 bg-black rounded-lg border border-gray-700 shadow-md dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        {/* Conditionally show "Expert" if the Role is not "Visitor" */}
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center rounded dark:bg-primary-200 dark:text-primary-800">
          {Role !== "Visitor" && (
            <div className="flex space-x-1">
              <span className="text-green">Expert</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="green"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456ZM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423Z"
                />
              </svg>
            </div>
          )}
        </span>
        {/* <span className="text-sm">{new Date(post.time).toLocaleDateString()}</span> */}
      </div>
      <div className="flex items-center space-x-4 space-y-2">
        <img className="w-10 h-10 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Avatar" />
        <div className='flex justify-between w-full'>
          <div className="font-medium uppercase text-lg py-2 text-white">{post.name.name}</div>
          <div className="text-sm ">{new Date(post.time).toLocaleDateString()}</div>
        </div>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
        {post.title}
      </h2>
      <p className="font-light text-gray-200 dark:text-gray-400">{post.description}</p>
      <div className="mt-4 flex space-x-4 justify-end">
        <button
          onClick={() => onDelete(post._id)}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <TbTrash className="mr-1 size-6" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default FetchMyPost;
