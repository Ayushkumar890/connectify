import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import Popular from './Popular';
import PostForm from './PostForm';

const Layout = () => {
  return (
    <div className="flex text-white max-h-screen h-screen bg-black">
      <SideBar />
      <div className='flex lg:flex-row flex-1'>
        <div className="flex  flex-col w-full h-screen overflow-hidden">

          <Header />

          <div className="flex-1 md:px-10 overflow-y-auto hide-scrollbar">
            <Outlet />
          </div>

        </div>
        
        <div className='absolute z-10 bottom-6 right-10  lg:right-[385px]'>
          <PostForm />
        </div>

        <div className='lg:flex hidden  flex-col  '>
          <div className=' hide-scrollbar overflow-y-auto'>
            <Popular />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;
