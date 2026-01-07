const KaviosPixImage = require("../models/Image");
const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(req, res) {
  try {
    const file = req.file;
    const { albumId, name, tags, person, size } = req.body;
    if (!file) return res.status(400).send("To file uploaded");

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
    });
    const newImage = new KaviosPixImage({
      imageUrl: result.secure_url,
      albumId,
      name,
      tags,
      person,
      size,
    });
    const savedImage = await newImage.save();

    res.status(200).json({
      message: "Image Uploaded Successfully",
      image: savedImage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Image Upload Failed",
      error: error.message,
    });
  }
}
async function getImages(req, res) {
  try {
    const images = await KaviosPixImage.find().populate(["albumId", "person", "comments.author"]);
    if (images) {
      res.status(200).json({ message: "Images are found", images });
    } else {
      res.status(404).json({ message: "Images are not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch images", error: error });
  }
}
async function getImageById(req, res) {
  try {
    const image = await KaviosPixImage.findById(req.params.id).populate(["albumId", "person", "comments.author"]);
    if (image) {
      res.status(200).json({ message: "Image is found", image });
    } else {
      res.status(404).json({ message: "Image is not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to fetch images", error: error });
  }
}

async function updateImageById(req, res) {
  try {
    const updatedImage = await KaviosPixImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedImage) {
      return res
        .status(200)
        .json({ message: "Image detail is updated", updatedImage });
    } else {
      return res.status(404).json({ message: "Image detail is not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while updating the image details", error });
  }
}

async function deleteImageById(req, res) {
  try {
    const deletedImage = await KaviosPixImage.findByIdAndDelete(req.params.id);
    if (deletedImage) {
      return res
        .status(200)
        .json({ message: "Image detail is deleted", deletedImage });
    } else {
      return res.status(404).json({ message: "Image detail is not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while deleting the image details", error });
  }
}
module.exports = {
  uploadImage,
  getImages,
  getImageById,
  updateImageById,
  deleteImageById,
};
