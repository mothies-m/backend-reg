const db = require("../models");
const User = db.Speaker;

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
};
