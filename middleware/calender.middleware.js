const { google } = require('googleapis');

// Initialize the OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,          // Replace with your Client ID
  process.env.CLIENT_SECRET,      // Replace with your Client Secret
  process.env.REDIRECT_URI        // Replace with your Redirect URI
);

// Set the access token manually
oAuth2Client.setCredentials({
  access_token: 'YOUR_ACCESS_TOKEN' // Replace with the access token you obtained
});

// Now you can use the `oAuth2Client` for API requests
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const createCalendarEvent = async (user, speaker, session) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    // Log the session details to verify correctness
    console.log('Session date:', session.date);
    console.log('Session time slot:', session.time_slot);

    // Combine date and time for the start dateTime
    const startDateTime = new Date(`${session.date}T${session.time_slot}Z`);
    console.log('Start DateTime:', startDateTime);

    // Calculate the end time by adding 1 hour to the start time
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    console.log('End DateTime:', endDateTime);

    const event = {
      summary: `Session with ${speaker.expertise}`,
      description: `A session with ${speaker.expertise} has been scheduled.`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'UTC',
      },
      attendees: [
        { email: user.email },
        { email: speaker.email },
      ],
      reminders: {
        useDefault: true,
      },
    };

    const eventResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    console.log('Event created: %s', eventResponse.data.htmlLink);
  } catch (error) {
    console.error('Error creating calendar event:', error);
  }
};
module.exports = createCalendarEvent;
