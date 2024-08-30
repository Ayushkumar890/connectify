import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="w-full hide-scrollbar ">
      <div className="py-4 px-4 w-full bg-black  lg:py-2 lg:px-6">
        <div className="grid   gap-8 w-full">
          <article className="p-6  bg-black rounded-lg border border-gray-700 shadow-md  dark:border-gray-700 ">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center  rounded dark:bg-primary-200 dark:text-primary-800">
                <span className='text-green pr-1 '>Expert</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

              </span>
              <span className="text-sm">14 days ago</span>
            </div>
            <div className="flex items-center space-x-4">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="Jese Leos avatar"
                />
                <span className="font-medium py-2 text-white">Jese Leos</span>
                
              </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
              <Link to="#">How to quickly deploy a static website</Link>
            </h2>
            <p className="mb-5 font-light text-gray-200 dark:text-gray-400">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers influence both web designers and
              developers.
            </p>
            <div className="flex justify-between items-center">
             
              <Link
                to={""}
                className="inline-flex items-center text-gray-400 font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Read more
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;