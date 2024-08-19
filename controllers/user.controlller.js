const createCalendarEvent = require("../middleware/calender.middleware");
const { bookingMail } = require("../middleware/otp.middleware");
const { Speaker, Session, User } = require("../models");

//list of speaker
const speakers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "speaker", is_verified: true },
      attributes: ["user_id", "first_name", "last_name"],
    });

    const speakers = await Speaker.findAll({
      attributes: ["user_id", "expertise", "price_per_session", "created_at"],
    });

    const userIds = users.map((user) => user.user_id);

    if (userIds.length === 0) {
      return res.status(404).json({ message: "No speakers found." });
    }

    const result = [];

    for (const user of users) {
      for (const speaker of speakers) {
        if (user.user_id === speaker.user_id) {
          const combinedData = {
            speaker_id: speaker.speaker_id,
            user_id: speaker.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            expertise: speaker.expertise,
            price_per_session: speaker.price_per_session,
            created_at: speaker.created_at,
          };

          result.push(combinedData);
        }
      }
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

//Booking

const booking = async (req, res) => {
  const { user_id, speaker_id, date, time_slot, email, user, time } = req.body;

  if (!user_id || !speaker_id || !date || !time_slot) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "user" || !user.is_verified) {
      return res.status(403).json({
        message: "Access denied, only verified users can access this route",
      });
    }
    const speaker = await Speaker.findOne({ where: { speaker_id } });

    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found." });
    }

    const validTimeSlots = [
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
    ];

    if (!validTimeSlots.includes(time_slot)) {
      return res.status(400).json({ message: "Invalid time slot." });
    }

    const existingSession = await Session.findOne({
      where: { speaker_id, date, time_slot },
    });

    if (existingSession) {
      return res.status(400).json({ message: "Time slot is already booked." });
    }

    const mail = await User.findOne({ where: user_id });
    await bookingMail(mail.email, user, speaker, date, time_slot);

    const session = await Session.create({
      user_id,
      speaker_id,
      date,
      time_slot,
    });

    const time = await Session.findOne({ where: {speaker_id: speaker_id} });
    await createCalendarEvent(user, speaker, time);

    res.status(201).json({
      message: "Session booked successfully.",
      session,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { booking, speakers };
