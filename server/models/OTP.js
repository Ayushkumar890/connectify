//using nodemailer for mail sending
// const mongoose = require('mongoose');
// const mailSender = require('../utils/mailSender');

// const OTPSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//     },
//     otp: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         expires: 60 * 3, //deleted after 3 minutes
//     },
// });

// async function sendVerificationEmail(email, otp) {
//     try {
//         const mailResponse = await mailSender(
//             email,
//             "Verification Email",
//             `<h1>Please confirm your OTP</h1>
//              <p>Here is your OTP code: ${otp}</p>
//              <p>your otp valid only for 3 minutes</p>`
//         );
//         // console.log("Email sent successfully: ", mailResponse);
//     } catch (error) {
//         console.log("Error occurred while sending email: ", error);
//         throw error;
//     }
// }

// OTPSchema.pre('save', async function(next) {
//     if (this.isNew) {
//         await sendVerificationEmail(this.email, this.otp);
//     }
//     next();
// });

// const OTP = mongoose.model('OTP', OTPSchema);

// module.exports = OTP;

//using brevo for mail sending
const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 3, // deleted after 3 minutes
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">OTP Verification</h2>
                <p style="font-size: 16px; color: #555;">Hello,</p>
                <p style="font-size: 16px; color: #555;">
                    Your One-Time Password (OTP) for verification is:
                </p>
                <div style="text-align: center; margin: 25px 0;">
                    <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 12px 24px; border-radius: 8px; color: #222;">
                        ${otp}
                    </span>
                </div>
                <p style="font-size: 15px; color: #777;">
                    This OTP is valid for only <b>3 minutes</b>.
                </p>
                <p style="font-size: 15px; color: #777;">
                    Please do not share this OTP with anyone.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 13px; color: #999; text-align: center;">
                    If you did not request this email, please ignore it.
                </p>
            </div>
        `;

        const mailResponse = await mailSender(
            email,
            "Verification Email",
            htmlContent
        );

        return mailResponse;
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}

OTPSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }
        next();
    } catch (error) {
        next(error);
    }
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;