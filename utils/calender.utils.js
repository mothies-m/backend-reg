const { default: ical } = require('ical-generator');
const nodemailer = require('nodemailer');

function getIcalObjectInstance(starttime, endtime, summary, description, location, url, name, email) {
    const cal = ical({ domain: 'mytestwebsite.com', name: 'calendar event' });
    cal.createEvent({
        start: starttime,
        end: endtime,
        summary: summary,
        description: description,
        location: location,
        url: url,
        organizer: {
            name: name,
            email: email
        },
    });
    return cal.toString();
}

async function sendBookingConfirmation(toEmail, starttime, endtime, summary, description, location, url, organizerName, organizerEmail) {
    try {
        const icalData = getIcalObjectInstance(starttime, endtime, summary, description, location, url, organizerName, organizerEmail);

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER_ID,
                pass: process.env.SMTP_KEY,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_SENDER,
            to: toEmail,
            subject: "Your Booking Confirmation",
            html: `<p>Dear User,</p><p>Your event has been scheduled.</p>`,
            attachments: [
                {
                    filename: "event.ics",
                    content: icalData, 
                    contentType: "text/calendar",
                },
            ],
        });

        console.log("Booking confirmation email sent successfully");
    } catch (error) {
        console.error("Error sending booking confirmation:", error.message);
    }
}
module.exports = { sendBookingConfirmation };