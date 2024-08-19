const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER_ID,
    pass: process.env.SMTP_KEY, 
  },
});

const sendOtp = async(toEmail, otp) => {
  await transporter.sendMail({
    from: process.env.SMTP_SENDER,
    to: toEmail,
    subject: "Your One-Time Password (OTP) for Authentication",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: #333;">
      <h2 style="color: #4CAF50;">One-Time Password (OTP)</h2>
      <p>Dear User,</p>
      <p>Thank you for choosing our service. Please use the following One-Time Password (OTP) to complete your authentication:</p>
      <h1 style="color: #ff6600; font-size: 48px;">${otp}</h1>
      <p style="color: #555;">This OTP is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
      <p>Regards,<br>PlateUp</p>
    </div>`
  });
}

const bookingMail = async (toEmail, user, speaker, date, time_slot) => {
  await transporter.sendMail({
    from: process.env.SMTP_SENDER,
    to: toEmail,
    subject: "Session Booking Confirmation",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: left; padding: 20px; color: #333;">
      <h2 style="color: #4CAF50;">Booking Confirmation</h2>
      <p>Dear ${user.first_name} ${user.last_name},</p>
      <p>Your session with the speaker <strong>${speaker.expertise}</strong> has been successfully booked.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time_slot}</p>
      <p>Thank you for choosing our service. We look forward to your session.</p>
      <p>Regards,<br>PlateUp</p>
    </div>`,
  });
};

module.exports = { sendOtp, bookingMail };
