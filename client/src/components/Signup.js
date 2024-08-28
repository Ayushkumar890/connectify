import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Visitor');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password, role, otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error signing up");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input
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
            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;
