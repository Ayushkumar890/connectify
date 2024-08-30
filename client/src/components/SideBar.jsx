import React, { useState } from 'react';
import {
  TbLayoutDashboard,
  // TbInbox,
  TbHome,
  TbUsersGroup,
  TbSearch,
  TbMessage2,
  TbCircleChevronRight,
} from 'react-icons/tb';
import logo1 from '../Assets/logo-no-background.png';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation()
if (location.pathname === '/otp'|| location.pathname === '/'  || location.pathname === '/login' || location.pathname === '/signup') return

  return (
    <div>
      <div
        className={`${
          open ? 'w-80 pl-10' : 'w-24'
        } bg-black min-h-screen p-5 pt-8 relative duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="white"
          className={`absolute cursor-pointer font-bold -right-5 top-9 w-10 p-1 bg-gray-800 border-2 border-gray-700 rounded-full ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>

        <div className="flex gap-x-4 items-center">
          <img
            src={logo1}
            className={`cursor-pointer w-56 duration-500 ${
              open && 'rotate-[360deg]'
            }`}
            alt="Logo"
          />
        </div>

      
        <ul className="pt-6">
          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2`}
          >
            <TbHome style={{ width: '30px', height: '30px' }} />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Home
            </span>
          </li>
          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2 ${
              open && 'bg-light-white'
            }`}
          >
            <TbLayoutDashboard style={{ width: '30px', height: '30px' }} />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Dashboard
            </span>
          </li>
          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-9`}
          >
            <TbMessage2 style={{ width: '30px', height: '30px' }} />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Inbox
            </span>
          </li>

          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2`}
          >
            <TbUsersGroup style={{ width: '30px', height: '30px' }} />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Communities
            </span>
          </li>

          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2`}
          >
            <TbSearch style={{ width: '30px', height: '30px' }} />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Search
            </span>
          </li>

          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2`}
          >
            <TbCircleChevronRight style={{ width: '30px', height: '30px' }} />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              About
            </span>
          </li>
        </ul>

      
      </div>
        <div
          className={`absolute bottom-5 pl-5 flex items-center space-x-4 text-white`}
        >
          <img
            className="w-12 h-12 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          />
          <div>
            <div
            className={`font-medium ${!open ? 'hidden' : 'block'} origin-left duration-200`}
          >
            Jese Leos
          </div>
           <div
            className={`font-medium ${!open ? 'hidden' : 'block'}  origin-left text-gray-600 duration-200`}
          >
            JeseLeos@gmail.com
          </div>
          </div>
          
         
        </div>
    </div>
  );
};

export default SideBar;
