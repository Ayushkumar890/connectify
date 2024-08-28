const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token "
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error Occurred in Authentication "
        });
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "You are not authorized Student"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred: " + error
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "You are not authorized Admin"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred: " + error
        });
    }
}
