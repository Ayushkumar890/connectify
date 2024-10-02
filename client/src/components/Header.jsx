import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState('Your World');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      setActive('Your World');
    } else if (location.pathname === '/mypost') {
      setActive('Explore');
    }
  }, [location.pathname]);

  if (
    location.pathname === '/otp' ||
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/signup'
  ) return null;

  return (
    <div className="w-full flex justify-center text-white bg-black border-gray-700 border-b-2">
      <div className="flex w-full">
        {/* Your World */}
          <div className="w-1/2 flex py-3 hover:bg-zinc-800 items-center justify-center">
        <Link to="/home">
            <div
              onClick={() => setActive('Your World')}
              className={`relative cursor-pointer w-full text-center pb-2 transition-all duration-300 ${active === 'Your World' ? 'text-white' : 'text-gray-400'
                }`}
            >
              Your World
              {active === 'Your World' && (
                <span className="absolute left-0 right-0 -bottom-[2px] mx-auto h-[4px] w-[70%] bg-green rounded-full transition-all duration-300"></span>
              )}
            </div>
        </Link>
          </div>

        {/* My Post */}
          <div className="w-1/2 flex py-3 hover:bg-zinc-800 items-center justify-center">
        <Link to="/mypost">
            <div
              onClick={() => setActive('Explore')}
              className={`relative cursor-pointer w-full text-center pb-2 transition-all duration-300 ${active === 'Explore' ? 'text-white' : 'text-gray-400'
                }`}
            >
              My Post
              {active === 'Explore' && (
                <span className="absolute left-0 right-0 -bottom-[2px] mx-auto h-[4px] w-[70%] bg-green rounded-full transition-all duration-300"></span>
              )}
            </div>
        </Link>
          </div>
      </div>
    </div >
  );
};

export default Header;
