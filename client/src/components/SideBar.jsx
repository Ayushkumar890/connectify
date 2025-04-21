import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  TbLayoutDashboard,
  TbHome,
  TbUsersGroup,
  TbSearch,
  TbMessage2,
  TbLogout,
} from 'react-icons/tb';
// import { BsFire } from 'react-icons/bs';
import logo1 from '../Assets/logo-no-background.png';
import logo2 from '../Assets/small-logo.png';
import axios from 'axios';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatarLink, setAvatarLink] = useState(
    'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg'
  );

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/profile', {
        withCredentials: true,
      });
      if (response.data && response.data.user.email) {
        setEmail(response.data.user.email);
        setName(response.data.user.name);
        setAvatarLink(response.data.user.image);
        setRole(response.data.user.role);
      } else {
        console.error('Error fetching user data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/logout', {
        withCredentials: true,
      });
      console.log(response.data.message);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    fetchUserData();

    if (window.innerWidth < 768) {
      setOpen(false);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  if (['/otp', '/', '/login', '/signup'].includes(location.pathname)) return null;

  return (
    <div>
      <div
        className={`${
          open ? 'w-80' : 'w-20 md:w-24'
        } z-20 bg-black min-h-screen border-r-2 border-gray-700 p-5 flex flex-col items-center pt-8 relative duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="white"
          className={`absolute cursor-pointer font-bold -right-5 top-9 w-10 hidden md:block p-1 bg-gray-800 border-2 border-gray-700 rounded-full ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
        </svg>
        <div className="flex gap-x-4 items-center">
          <Link to="/">
            <img src={open ? logo1 : logo2} className={`cursor-pointer w-56 duration-500`} alt="Logo" />
          </Link>
        </div>
        <ul className="pt-6">
          <li
            className={`flex rounded-md p-2 cursor-pointer ${
              isActive('/home') ? ' text-green' : 'hover:bg-light-white text-gray-300'
            } text-lg items-center mt-2`}
          >
            <Link to="/home" className="flex items-center gap-x-4">
              <TbHome style={{ width: '30px', height: '30px' }} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Home</span>
            </Link>
          </li>

          {role !== 'Visitor' && (
            <li
              className={`flex rounded-md p-2 cursor-pointer mb-8 ${
                isActive('/dashboard') ? ' text-green' : 'hover:bg-light-white text-gray-300'
              } text-lg items-center mt-2`}
            >
              <Link to="/dashboard" className="flex items-center gap-x-4">
                <TbLayoutDashboard style={{ width: '30px', height: '30px' }} />
                <span className={`${!open && 'hidden'} origin-left duration-200`}>Dashboard</span>
              </Link>
            </li>
          )}

          <li
            className={`flex rounded-md p-2 cursor-pointer ${
              isActive('/chat') ? ' text-green' : 'hover:bg-light-white text-gray-300'
            } text-lg items-center mt-2`}
          >
            <Link to="/chat" className="flex items-center gap-x-4">
              <TbMessage2 style={{ width: '30px', height: '30px' }} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Inbox</span>
            </Link>
          </li>

          <li
            className={`flex rounded-md p-2 cursor-pointer ${
              isActive('/community') ? ' text-green' : 'hover:bg-light-white text-gray-300'
            } text-lg items-center mt-2`}
          >
            <Link to="/community" className="flex items-center gap-x-4">
              <TbUsersGroup style={{ width: '30px', height: '30px' }} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Communities</span>
            </Link>
          </li>

          <li
            className={`flex rounded-md p-2 cursor-pointer ${
              isActive('/search') ? ' text-green' : 'hover:bg-light-white text-gray-300'
            } text-lg items-center mt-2`}
          >
            <Link to="/search" className="flex items-center gap-x-4">
              <TbSearch style={{ width: '30px', height: '30px' }} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Search</span>
            </Link>
          </li>

          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center mt-2`}
          >
            <button className="flex gap-3" onClick={handleLogout}>
              <TbLogout style={{ width: '30px', height: '30px' }} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/profile">
          <div className={`absolute bottom-5 pl-5 flex items-center space-x-4 text-white z-20`}>
            <img className="w-12 h-12 rounded-full" src={avatarLink} alt="User avatar" />
            <div>
              <div className={`font-medium ${!open ? 'hidden' : 'block'} origin-left duration-200`}>
                {name || 'No name found'}
              </div>
              <div
                className={`font-medium ${!open ? 'hidden' : 'block'} origin-left text-gray-600 duration-200 truncate w-[230px]`}
              >
                {email || 'No email found'}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
