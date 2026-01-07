// backend/models/User.js
const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;

const albumSchema = new mongoose.Schema({
  albumId: {
    type: String,
    default: uuidv4, // Generate UUID automatically
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KavioPixUser",
    required: true,
  },
  sharedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KavioPixUser",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("KaviosPixAlbum", albumSchema);
