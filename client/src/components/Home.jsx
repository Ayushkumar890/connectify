import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
    const handlesignup = async () => {
        navigate('otp');
    }
    const handlelogin = async () => {
        navigate('login');
    }
  return (
    <>
    <div className='flex justify-center gap-10 '>

      <button onClick={handlesignup} className='border-2 border-green rounded-xl text-bold text-2xl  px-4 py-2'>Sign Up</button>
      <button onClick={handlelogin} className='border-2 border-green rounded-xl text-bold text-2xl  px-4 py-2'>Login</button>
    </div>
    </>
  )
}

export default Home