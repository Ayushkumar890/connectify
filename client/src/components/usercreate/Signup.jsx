import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import validator from "validator";

function Signup() {
    const [name, setName] = useState('');
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Visitor');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const navigate = useNavigate();

    const validateEmail = (emailToValidate) => {
        if (!validator.isEmail(emailToValidate)) {
            setEmailError("Please enter a valid email!");
        } else {
            setEmailError("");
        }
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !otp) {
            setMessage("All fields are required");
            return;
        }

        if (!isNaN(name)) {
            setMessage("Name cannot be a number");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('https://connectify-93bj.onrender.com/auth/signup', { name, email, password, role, otp });
            setMessage(response.data.message);
            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Error Signing Up");
            }
            setLoading(false);
            console.error(error);
        }
    };

    const messageColor = message === "User created successfully" ? 'green' : 'red';

    const roleOptions = [
        { value: 'visitor', label: 'User', icon: '👤' },
        { value: 'Fitness', label: 'Fitness Coach', icon: '💪' },
        { value: 'Mental', label: 'Mental Health Expert', icon: '🧠' },
        { value: 'Yoga', label: 'Yoga Instructor', icon: '🧘' },
        { value: 'Sports', label: 'Sports Coach', icon: '⚽' }
    ];

    return (
        <div className='bg-black min-h-screen relative overflow-hidden'>

            <div className="text-center pt-8 pb-6 relative z-10">
                <div className="flex items-center justify-center mb-4">
                    <div className="relative w-16 h-14">
                        <div className="absolute inset-0 bg-gradient-to-r from-green/20 to-blue-500/20 rounded-2xl blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-700">
                            <svg fill="none" viewBox="0 0 24 24" className="w-10 h-8 text-green" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            Create Your Account</span>
                    </h2>
                    <p className="text-gray-400">
                        Already have an account? 
                        <Link to="/login" className="text-green hover:text-green/80 font-semibold ml-1 transition-colors duration-200">
                            Sign In
                        </Link>
                    </p>
                    
                </div>
            </div>

            <div className="flex justify-center my-4 mx-4 md:mx-0 relative z-10">
                <div className="w-full max-w-xl relative">
                    <div className="absolute -inset-1 bg-black rounded-2xl blur-lg opacity-30"></div>
                    
                    <div className="relative bg-black backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
                        <div className="space-y-4">
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-gray-300 text-sm font-semibold tracking-wide">
                                        FULL NAME
                                    </label>
                                    <div className="relative">
                                        <input 
                                            className={`w-full bg-gray-800/50 text-white font-medium border-2 rounded-xl py-4 text-center transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                                                focusedField === 'name' || name
                                                    ? 'border-green focus:border-green focus:shadow-lg focus:shadow-green/20'
                                                    : 'border-gray-600 hover:border-gray-500'
                                            }`}
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="Enter your full name"
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-gray-300 text-sm font-semibold tracking-wide">
                                        OTP CODE
                                    </label>
                                    <div className="relative">
                                        <input 
                                            className={`w-full bg-gray-800/50 text-white font-medium border-2 rounded-xl py-4 text-center transition-all duration-300 focus:outline-none backdrop-blur-sm text-center text-lg tracking-widest ${
                                                focusedField === 'otp' || otp
                                                    ? 'border-green focus:border-green focus:shadow-lg focus:shadow-green/20'
                                                    : 'border-gray-600 hover:border-gray-500'
                                            }`}
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            onFocus={() => setFocusedField('otp')}
                                            onBlur={() => setFocusedField('')}
                                            placeholder="000000"
                                            maxLength="6"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-semibold tracking-wide">
                                    EMAIL ADDRESS
                                </label>
                                <div className="relative">
                                    
                                    <input
                                        className={`w-full bg-gray-800/50 text-white font-medium border-2 rounded-xl py-4 pl-8 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                                            emailError 
                                                ? 'border-red-500 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20' 
                                                : focusedField === 'email' || email
                                                    ? 'border-green focus:border-green focus:shadow-lg focus:shadow-green/20'
                                                    : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            validateEmail(e.target.value);
                                        }}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField('')}
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
                                    <div className="flex items-center space-x-2 text-red-400 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{emailError}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-semibold tracking-wide">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    
                                    <input
                                        className={`w-full bg-gray-800/50 text-white font-medium border-2 rounded-xl py-4 pl-12 pr-12 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                                            focusedField === 'password' || password
                                                ? 'border-green focus:border-green focus:shadow-lg focus:shadow-green/20'
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField('')}
                                        placeholder="Create a secure password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-300 text-sm font-semibold tracking-wide">
                                    I AM A
                                </label>
                                <div className="relative">
                                    <select 
                                        className={`w-full bg-gray-800/50 text-white font-medium border-2 rounded-xl py-4 pl-4 pr-10 transition-all duration-300 focus:outline-none backdrop-blur-sm appearance-none cursor-pointer ${
                                            focusedField === 'role' || role !== 'Visitor'
                                                ? 'border-green focus:border-green focus:shadow-lg focus:shadow-green/20'
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)}
                                        onFocus={() => setFocusedField('role')}
                                        onBlur={() => setFocusedField('')}
                                    >
                                        {roleOptions.map((option, index) => (
                                            <option key={index} value={option.value} className="bg-gray-800 text-white">
                                                {option.icon} {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Links */}
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
                                
                                <Link 
                                    to="/login" 
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                                >
                                    Already have an account? Sign In
                                </Link>
                            </div>

                            {/* Sign Up Button */}
                            <button
                                onClick={handleSignup}
                                disabled={loading || emailError || !name || !email || !password || !otp}
                                className={`group relative w-full overflow-hidden rounded-xl py-4 px-6 font-bold text-lg transition-all duration-300 transform ${
                                    loading || emailError || !name || !email || !password || !otp
                                        ? 'bg-white text-black cursor-not-allowed'
                                        : 'bg-green text-white hover:scale-105 hover:shadow-xl hover:shadow-green/30 active:scale-95'
                                }`}
                            >
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                                
                                {!loading && !emailError && name && email && password && otp && (
                                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green/90 to-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded-xl"></span>
                                )}
                            </button>

                            {message && (
                                <div className={`p-4 rounded-xl border-l-4 ${
                                    messageColor === 'green' 
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
        </div>
    );
}

export default Signup;