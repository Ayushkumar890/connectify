import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import validator from "validator";

function Otp() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const validateEmail = (emailToValidate) => {
        if (!validator.isEmail(emailToValidate)) {
            setEmailError("Please enter a valid email!");
        } else {
            setEmailError("");
        }
    };

    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!email || emailError) {
            setMessage("Please enter a valid email.");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('https://connectify-93bj.onrender.com/api/auth/sendotp', { email });
            setMessage(response.data.message);
            if (response.data.success) {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/signup', { state: { email } });
                }, 1000);
            } else {
                setLoading(false);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Error sending OTP");
            }
            setLoading(false);
            console.error(error);
        }
    };

    const messageColor = message === "OTP sent successfully" ? 'green' : 'red';

    return (
        <div className='bg-black min-h-screen relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-10 w-32 h-32 bg-green/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Header Section */}
            <div className="text-center pt-16 pb-8 relative z-10">
                <div className="items-center mb-6">
                    {/* Enhanced Icon */}
                    <div className="relative mx-auto w-20 h-20 mb-6">
                        <div className="absolute inset-0 bg-black rounded-2xl blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700">
                            <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-green" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl tracking-tight font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            Verify Your Identity</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Enter your email address to receive a secure OTP for account verification
                    </p>

                    {/* Decorative line */}
                    <div className="w-16 h-1 bg-gradient-to-r from-green to-green/50 mx-auto mt-4"></div>
                </div>
            </div>

            {/* Main Form Section */}
            <div className="flex justify-center my-8 mx-4 md:mx-0 relative z-10">
                <div className="w-full max-w-lg relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-black rounded-2xl blur-lg opacity-30"></div>

                    {/* Main Form Card */}
                    <div className="relative bg-black backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white">
                        <div className="space-y-6">
                            {/* Email Input Section */}
                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-semibold tracking-wide" htmlFor='Email'>
                                    EMAIL ADDRESS
                                </label>

                                <div className="relative">
                                    <input
                                        className={`w-full bg bg-zinc-950 text-white font-medium border-2 rounded-xl py-4 pl-12 pr-4 leading-tight transition-all duration-300 focus:outline-none backdrop-blur-sm ${emailError
                                                ? 'border-red-500 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20'
                                                : isEmailFocused || email
                                                    ? 'border-green focus:shadow-lg focus:shadow-green/20'
                                                    : 'border-white'
                                            }`}
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            const newEmail = e.target.value;
                                            setEmail(newEmail);
                                            validateEmail(newEmail);
                                        }}
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                        placeholder="Enter your email address"
                                        required
                                    />

                                    {email && !emailError && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {emailError && (
                                    <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{emailError}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <Link
                                    to="/"
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>Back to Home</span>
                                </Link>
                            </div>

                            <button
                                onClick={handleSendOtp}
                                disabled={loading || emailError || !email}
                                className={`group relative w-full overflow-hidden rounded-xl py-4 px-6 font-bold text-lg transition-all duration-300 transform ${loading || emailError || !email
                                        ? 'bg-white text-black cursor-not-allowed'
                                        : 'bg-green hover:bg-green/90 text-white hover:scale-105 hover:shadow-xl hover:shadow-green/30 active:scale-95'
                                    }`}
                            >
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Sending OTP...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send OTP</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </>
                                    )}
                                </span>

                                {!loading && !emailError && email && (
                                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green/90 to-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded-xl"></span>
                                )}
                            </button>

                            {message && (
                                <div className={`p-4 rounded-xl border-l-4 ${messageColor === 'green'
                                        ? 'bg-green/10 border-green text-green'
                                        : 'bg-red-500/10 border-red-500 text-red-400'
                                    } flex items-center space-x-3`}>
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {messageColor === 'green' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                    </svg>
                                    <span className="font-medium">{message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default Otp;