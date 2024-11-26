const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken || req.headers['authorization'];
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ success: false, message: 'Invalid token' });

            const user = await User.findById(decoded.id);
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ success: false, message: 'Authentication error' });
    }
};





exports.verifyToken = (req, res) => {
    const token = req.cookies.jwtToken;
    // console.log("Token exists:", token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        res.status(200).json({ success: true, user: decoded });
    });
};



// exports.isStudent = (req, res, next) => {
//     try {
//         if (req.user.role !== "Student") {
//             return res.json({
//                 success: false,
//                 message: "You are not authorized Student"
//             });
//         }
//         next();
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: "Error occurred: " + error
//         });
//     }
// }

// exports.isAdmin = (req, res, next) => {
//     try {
//         if (req.user.role !== "Admin") {
//             return res.json({
//                 success: false,
//                 message: "You are not authorized Admin"
//             });
//         }
//         next();
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: "Error occurred: " + error
//         });
//     }
// }


