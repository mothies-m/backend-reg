const { User, Speaker } = require("../models");

const getSpeaker = async (req, res) => {
  const { user_id, expertise, price_per_session } = req.body;

  if (!user_id || !expertise || !price_per_session) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Find the user by user_id
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "speaker") {
      return res.status(403).json({
        message: "Access denied. Only verified speakers can access this route.",
      });
    }
    //verify user_id with speaker
    let speaker = await Speaker.findOne({ where: { user_id: user.user_id } });

    if (!speaker) {
      speaker = await Speaker.create({
        user_id,
        expertise,
        price_per_session,
      });
    } else {
      speaker.user_id = user_id;
      speaker.expertise = expertise;
      speaker.price_per_session = price_per_session;

      await speaker.save();
    }

    return res.json({
      message: "Speaker profile updated successfully.",
      speaker,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error });
  }
};

module.exports = getSpeaker;
