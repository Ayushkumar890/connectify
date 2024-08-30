import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Visitor');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password, role, otp });
            setMessage(response.data.message);
            setTimeout(() => {
                setLoading(false); // Set loading to false after the delay
                navigate('/login'); // Navigate after the delay
            }, 2000);

        } catch (error) {
            setMessage("Error signing up");
            console.error(error);
        }
    };
    const messageColor = message === "User created successfully" ? 'green' : 'red';
    return (
        <div className='bg-black min-h-screen'>
            <div className="text-center pt-4 ">
                <div className="flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-4xl tracking-tight text-white">
                    Sign Up into your account
                </h2>
                <span className="text-sm text-white">or <a href="/#" className="text-green-500">
                    Sign in into your account
                </a>
                </span>
            </div>
            <div className="flex justify-center my-2 mx-4 md:mx-0 ">
                <div className="w-full max-w-md rounded-lg shadow-md p-6 bg-neutral-900">
                    <div className="flex flex-wrap -mx-3 mb-6 ">
                        <div className="w-full flex md:w-full px-3 mb-6 gap-10">
                            <div className='w-1/2'>
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Email'>Name</label>
                                <input className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required />
                            </div>
                            <div className='w-1/2'>
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Password'>OTP</label>
                                <input className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    required />
                            </div>
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Email'>Email address</label>
                            <input className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required />
                        </div>

                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Password'>Password</label>
                            <input className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required />
                        </div>

                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Password'>Expert</label>

                            <select className='appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none' value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="Visitor">Fitness Coach</option>
                                <option value="Student">Mental Health Experts</option>
                                <option value="Admin">Yoga Instructor</option>
                                <option value="Admin">Sports Coach</option>
                            </select>
                        </div>
                        <div className="w-full flex items-center justify-between px-3 mb-3 ">
                            <div className="w-full text-right">
                                <a href="/#" className="text-blue-500 text-sm tracking-tight">Forget your password?</a>
                            </div>
                        </div>
                        <div className="w-full md:w-full px-3">
                            <button onClick={handleSignup} type='submit' className="block w-full bg-green text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green focus:outline-none ">{loading ? 'wait...' : 'Sign Up'}</button>
                        </div>
                        <div className='pt-8 mx-auto font-thin text-xl -mb-5'>
                            {message && <p style={{ color: messageColor }} >{message}</p>}
                        </div>
                    </div>
                </div>
            </div>





















            {/* <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Visitor">Visitor</option>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
            </select>
            <button onClick={handleSignup}>Signup</button>
            {message && <p>{message}</p>} */}
        </div>
    );
}

export default Signup;
