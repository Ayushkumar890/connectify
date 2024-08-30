import React from 'react'

export default function PopularCard() {
    return (
        <>
        <div className='p-4'>
            <button className="relative w-[310px] h-[150px] bg-gradient-to-t from-[#3d7c44] via-[#136d0e] to-[#0b8105] text-white rounded-2xl border-none outline-none cursor-pointer overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] group">
                <div className="absolute w-full left-0 top-1/2 transform -translate-y-1/2 text-[12px] uppercase tracking-wider transition-all duration-500 group-hover:-top-full">
                    <div className='text-left p-4'>
                        <h2 className='text-lg font-bold '>Get Fit</h2>
                        <p className='py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <h2 className='text-[13px] text-white font-bold'>Fitness</h2>
                    </div>
                </div>
                <div className="absolute w-full left-0 text-3xl font-bold top-[150%] transform -translate-y-1/2 uppercase tracking-wider transition-all duration-500 group-hover:top-1/2">
                    Enter
                </div>
            </button>
        </div>
        </>
    )
}
