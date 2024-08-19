const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const TOKEN_PATH = path.join(__dirname, 'token.json');
const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

const oAuth2Client = new google.auth.OAuth2();
oAuth2Client.setCredentials(tokens);

const createCalendarEvent = async (user, speaker, session) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const startDateTime = new Date(
      `${session.date}T${session.time_slot}`
    ).toISOString();
    const endDateTime = new Date(
      new Date(startDateTime).getTime() + 60 * 60 * 1000
    ).toISOString();

    const event = {
      summary: `Session with ${speaker.expertise}`,
      description: `A session with ${speaker.expertise} has been scheduled.`,
      start: {
        dateTime: startDateTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "UTC",
      },
      attendees: [{ email: user.email }, { email: speaker.email }],
      reminders: {
        useDefault: true,
      },
    };

    const eventResponse = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    console.log("Event created: %s", eventResponse.data.htmlLink);
  } catch (error) {
    console.error("Error creating calendar event:", error);
  }
};

module.exports = createCalendarEvent;