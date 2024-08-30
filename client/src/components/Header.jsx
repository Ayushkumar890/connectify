import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const Header = () => {
  // State to manage the active tab
  const [active, setActive] = useState('Your World');

  const location = useLocation()
  if (location.pathname === '/otp'|| location.pathname === '/'  || location.pathname === '/login' || location.pathname === '/signup') return
  

  return (
    <div className="w-full flex  justify-center  text-white bg-black border-gray-700 border-2">
      <div className="flex  w-full">
        {/* Your World */}
        <div className='w-1/2 flex py-3 hover:bg-zinc-800  items-center justify-center'>

       
        <div
          onClick={() => setActive('Your World')}
          className={`relative cursor-pointer  w-full text-center pb-2 transition-all duration-300 ${
            active === 'Your World' ? 'text-white' : 'text-gray-400'
          }`}
        >
          Your World
          {active === 'Your World' && (
            <span className="absolute left-0 right-0 -bottom-[2px] mx-auto h-[4px] w-[40%] bg-green rounded-full transition-all duration-300"></span>
          )}
        </div>
        </div>
        <div className='w-1/2  flex py-3 hover:bg-zinc-800  items-center justify-center'>

        {/* Explore */}
        <div
          onClick={() => setActive('Explore')}
          className={`relative cursor-pointer   w-full text-center pb-2 transition-all duration-300 ${
            active === 'Explore' ? 'text-white' : 'text-gray-400'
          }`}
        >
          My Post
          {active === 'Explore' && (
            <span className="absolute left-0 right-0 -bottom-[2px] mx-auto h-[4px] w-[40%] bg-green rounded-full transition-all duration-300"></span>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
