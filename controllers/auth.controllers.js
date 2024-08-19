const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendOtp } = require("../middleware/otp.middleware");

//REGISTER

const register = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  if (!first_name || !last_name || !email || !password || !role) {
    res.status(403).json({ message: "fields missing" });
    return;
  }
  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      res.status(201).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: `New user ${user.first_name} is Created as ${user.role} Role.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//LOGIN

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403).json({ message: "email or password is missing" });
    return;
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //otp gen and expire time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60000);

    await sendOtp(user.email, otp);

    await user.update({
      otp_code: otp,
      otp_expires_at: otpExpiresAt,
      is_verified: false, //rest verification
    });
    res.status(200).json({ message: "OTP sent to your mail" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//VERIFY OTP

const verify = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(403).json({ message: "email or otp is missing" });
    return;
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (new Date() > user.otp_expires_at) {
      return res.status(400).json({ error: "OTP as expired" });
    }
    if (otp !== user.otp_code) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    await user.update({ is_verified: true });

    //In 10min OTP expires and OTP is turned null
    setTimeout(async () => {
      await user.update({ is_verified: false, otp_code: null });
    }, user.otp_expires_at.getTime() - Date.now());

    //jwt
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      token,
    });
  } catch {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verify,
};
