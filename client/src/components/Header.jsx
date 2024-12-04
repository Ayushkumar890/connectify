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

  // Regex to match paths like '/community/anything'
  const hideHeaderPaths = [
    '/otp',
    '/',
    '/login',
    '/signup',
    '/profile',
    '/chat',
    '/search',
    '/community',
    '/community/create',
    '/dashboard',
    '/community/myCommunities',
    '/community/myCommunities/member',
  ];

  const isCommunityPathWithId = /^\/community\/[a-zA-Z0-9]+(\/members)?$/.test(location.pathname);

  if (hideHeaderPaths.includes(location.pathname) || isCommunityPathWithId) {
    return null;
  }

  return (
    <div className="relative w-full flex justify-center text-white bg-black z-10 border-gray-700 border-b-2">
      {/* Moving green line */}
      <div
        className={`absolute bottom-0 left-0 h-[4px] bg-green rounded-full transition-all duration-300`}
        style={{
          width: '20%',
          transform: `translateX(${active === 'Your World' ? '75%' : '325%'})`,
        }}
      ></div>

      <div className="flex w-full justify-center">
        {/* Your World */}
        <div className="w-1/2">
          <Link to="/home">
            <div
              onClick={() => setActive('Your World')}
              className={`flex py-3 hover:bg-zinc-800 items-center justify-center ${
                active === 'Your World' ? 'text-white' : 'text-gray-400'
              }`}
            >
              <div className="relative cursor-pointer w-full text-center pb-2">
                Your World
              </div>
            </div>
          </Link>
        </div>

        {/* My Post */}
        <div className="w-1/2">
          <Link to="/mypost">
            <div
              onClick={() => setActive('Explore')}
              className={`flex py-3 hover:bg-zinc-800 items-center justify-center ${
                active === 'Explore' ? 'text-white' : 'text-gray-400'
              }`}
            >
              <div className="relative cursor-pointer w-full text-center pb-2">
                My Post
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
