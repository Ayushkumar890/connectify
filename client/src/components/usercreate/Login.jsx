import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, { withCredentials: true });
            setMessage(response.data.message);
            
            setTimeout(() => {
                setLoading(false);
                navigate('/home'); 
            }, 1000);
    
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Error logging in");
            }
            setLoading(false);
            console.error(error);
        }
    };
    

    const messageColor = message === "Logged in successfully" ? 'green' : 'red';

    return (
        <div>
            <div className='bg-black min-h-screen'>
                <div className="text-center pt-20">
                    <div className="flex items-center justify-center">
                        <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl tracking-tight text-white pb-10">
                        Sign In into your account
                    </h2>
                </div>
                <div className="flex justify-center my-2 mx-4 md:mx-0">
                    <div className="w-full max-w-md rounded-lg shadow-md p-6 bg-neutral-900">
                        <form onSubmit={handleLogin} className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Email'>Email address</label>
                                <input
                                    className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-full px-3 mb-6">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor='Password'>Password</label>
                                <input
                                    className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-full px-3">
                                <button
                                    type='submit'
                                    className="block w-full bg-green text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green focus:outline-none"
                                >
                                    {loading ? 'Wait...' : 'Sign In'}
                                </button>
                            </div>
                            <div className='pt-8 mx-auto font-thin text-xl -mb-5'>
                                {message && <p style={{ color: messageColor }}>{message}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
