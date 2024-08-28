import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Otp from './components/Otp';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp" element={<Otp />} />
            </Routes>
        </Router>
    );
}

export default App;
