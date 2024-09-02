const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = (req, res, next) => {
  
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwtToken || req.body.token;

    // console.log('Extracted Token:', token);

    if (!token || token === 'undefined') {
        return res.status(401).json({
            success: false,
            message: "Token Missing"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }

        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    });
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
