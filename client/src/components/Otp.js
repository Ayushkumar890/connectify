import React, { useState } from 'react';
import axios from 'axios';

function Otp() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/sendotp', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error sending OTP");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Request OTP</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleSendOtp}>Send OTP</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Otp;
