const mongoose = require('mongoose');
const uuidv4 = require("uuid").v4;

const imageSchema = new mongoose.Schema({
  imageId: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true
  },
  imageUrl: {type: String, required: true},
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KaviosPixAlbum', // Assuming you have an Album model
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: String,
  },
  person: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KavioPixUser'
  }],
  isFavorite: {
    type: Boolean,
    default: false
  },
  comments: {
    type: [
      {
        text: {
          type: String,
          trim: true
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KavioPixUser'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  },
  size: {
    type: Number,
    required: true,
    min: 0,
    max:  5 * 1024 * 1024
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});


// Enable virtuals in JSON output
imageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('KaviosPixImage', imageSchema);