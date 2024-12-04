
import React from 'react'
import { Link } from 'react-router-dom'

const MyCommunity = ({community}) => {
  return (
    <div>
           <div className='p-4 '>
            <Link to={`/community/${community._id}/members`}>
            <button className="relative w-full md:w-[310px] h-[150px] border-green border-2 text-white rounded-2xl  outline-none cursor-pointer overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] group">
                <div className="absolute w-full left-0 top-1/2 transform -translate-y-1/2 text-[12px] uppercase tracking-wider transition-all duration-500 ">
                    <div className='text-left p-4'>
                        <h2 className='text-lg font-bold  '>{community.name}</h2>
                        <p className='py-5'>" {community.description} "</p>
                        <h2 className='text-[10px] text-green  font-semibold'> Category: {community.category}</h2>
                        <h2 className='text-[10px] text-green font-semibold'>AMembers: {community.members.length || []}</h2>
                    </div>
                </div>
            </button>
            </Link>
        </div>
    </div>
  )
}

export default MyCommunity