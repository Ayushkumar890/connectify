const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
require('dotenv').config();

// Signup handler
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, otp } = req.body;

        if (!isNaN(name)) {
            return res.status(400).json({
                success: false,
                message: "Name cannot be a number",
            });
        }

        if (!name || !email || !password || !otp) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const hex = Math.floor(Math.random() * 16777215).toString(16);
        const image = `https://ui-avatars.com/api/?background=${hex}&color=fff&name=${name}`;

        const newUser = await User.create({
            name, email, password: hashedPassword, role, image
        });

        return res.status(200).json({
            success: true,
            User: newUser,
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User registration failed"
        });
    }
}

// Login handler
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Account doesn't exist! Check entered credentials."
            });
        }

        const payload = {
            email: user.email,
            name: user.name,
            id: user._id,
            role: user.role,
        };

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
            const options = {
                expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'none', 
            };

            res.cookie('jwtToken', token, options).status(200).json({
                success: true,
                User: user,
                message: "Logged in successfully"
            });

        } else {
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Login failure: " + error.message
        });
    }
};



// Send OTP handler
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user is already registered
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }

        // Generate a new OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Ensure OTP is unique in the database
        let result = await OTP.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        }

        // Delete any existing OTP for the same email
        await OTP.deleteMany({ email });

        // Save the new OTP to the database
        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp, // In production, this should not be sent in the response for security reasons
        });

    } catch (error) {
        console.error("Error sending OTP:", error.message);
        res.status(500).json({
            success: false,
            message: "Try again",
        });
    }
};



exports.logout = (req, res) => {
    res.cookie('jwtToken', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 1),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', 
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};


exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user data",
        });
    }
};
