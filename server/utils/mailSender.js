// using nodemailer for mail sending

// const nodemailer = require('nodemailer');

// const mailSender = async (email, title, body) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,  
//             port: 2525, 
//             secure: true, 
//             auth: {
//                 user: process.env.MAIL_USER,  
//                 pass: process.env.MAIL_PASS,  
//             },
//         });

//         let info = await transporter.sendMail({
//             from: process.env.MAIL_USER,
//             to: email,
//             subject: title,
//             html: body,
//         });

//         // console.log("Email sent successfully: ");
//         return info;
//     } catch (error) {
//         console.log("Error occurred while sending email: ", error);
//         throw error;
//     }
// };


// module.exports = mailSender;

//using brevo for mail sending
const axios = require("axios");

const mailSender = async (email, title, body) => {
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Ayush",
                    email: process.env.MAIL_USER,
                },
                to: [{ email }],
                subject: title,
                htmlContent: body,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log("Brevo mail error:", error.response?.data || error.message);
        throw error;
    }
};

module.exports = mailSender;