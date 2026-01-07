// backend/models/User.js
const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4, // Generate UUID automatically
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: { type: String },
  authentication: {
    type: String,
    enum: ["Google OAuth2"], // You can add more methods later
    default: "Google OAuth2",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("KavioPixUser", userSchema);
