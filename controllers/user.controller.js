// backend/controllers/user.controller.js
const KavioPixUser = require("../models/userModel");

async function getAllUsers(req, res) {
  try {
    const users = await KavioPixUser.find({}, "-__v"); // exclude __v
    return res.status(200).json({
      message: users.length > 0 ? "Users found" : "No users",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

module.exports = {
  getAllUsers,
};