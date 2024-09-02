import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });
        console.log('API response:', response.data); // Debugging: log the full response
        if (response.data && response.data.user) {
          setName(response.data.user.name);
        } else {
          console.error('Error fetching user data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    fetchUserData();
  }, []);
  return (
    <div className="w-full hide-scrollbar ">
      <div className="py-1 md:py-4 px-2 md:px-4 w-full bg-black  lg:py-2 lg:px-6">
        <div className="grid   gap-8 w-full">
          <article className="p-6  bg-black rounded-lg border border-gray-700 shadow-md  dark:border-gray-700 ">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center  rounded dark:bg-primary-200 dark:text-primary-800">
                <div className='flex space-x-1'>
                  <span className='text-green'>Expert</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
              </span>
              <span className="text-sm">14 days ago</span>
            </div>
            <div className="flex items-center space-x-4 space-y-2">
              <img
                className="w-10 h-10 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="Jese Leos avatar"
              />
              <span className="font-medium text-lg py-2 text-white">{name}</span>

            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
              <Link to="#">Boost Your Immunity with These Essential Nutrients!
              </Link>
            </h2>
            <p className=" font-light text-gray-200 dark:text-gray-400">
              Vitamin C: Found in citrus fruits, it helps protect your body against infections.
              Zinc: Crucial for immune function, available in nuts, seeds, and meat.
              Probiotics: Enhance gut health, which is linked to overall immunity.
              Join the discussion below to learn more about how you can integrate these nutrients into your diet!
            </p>

          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;