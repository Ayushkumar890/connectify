import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import Popular from './Popular';

const Layout = () => {
  return (
    <div className="flex text-white max-h-screen h-screen bg-black">
      <SideBar />
      <div className='flex lg:flex-row flex-1'>
        <div className="flex flex-col w-full h-screen overflow-hidden">
          <Header />
          <div className="flex-1 px-10 overflow-y-auto border-2 border-gray-700 hide-scrollbar">
            <Outlet />
          </div>
        </div>
        {/* Only render Popular section if not on excluded paths */}
        <div className='flex flex-col px-4 '>
          <div className=' hide-scrollbar overflow-y-auto'>
            <Popular />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
