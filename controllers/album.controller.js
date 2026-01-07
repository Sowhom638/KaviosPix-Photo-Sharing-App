const KaviosPixAlbum = require("../models/Album");

async function createAlbum(req, res) {
  try {
    const { name, description, ownerId, sharedUsers } = req.body;

    if (name && description && ownerId && sharedUsers) {
      const newAlbum = new KaviosPixAlbum({
        name,
        description,
        ownerId,
        sharedUsers,
      });
      const savedAlbum = await newAlbum.save();
      return res
        .status(200)
        .json({ message: "Album is created", album: savedAlbum });
    } else {
      return res.status(404).json({ message: "Missing required fields" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while creating the album", error });
  }
}

async function getAllAlbums(req, res) {
  try {
    const albums = await KaviosPixAlbum.find().populate([
      "ownerId",
      "sharedUsers",
    ]);
    if (albums.length > 0) {
      return res.status(200).json({ message: "Albums are found", albums });
    } else {
      return res.status(404).json({ message: "Albums are not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while finding albums", error });
  }
}

async function getAlbumById(req, res) {
  try {
    const album = await KaviosPixAlbum.findById(req.params.id).populate([
      "ownerId",
      "sharedUsers",
    ]);
    if (album) {
      return res.status(200).json({ message: "Album is found", album });
    } else {
      return res.status(404).json({ message: "Album is not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while finding the album", error });
  }
}

async function updatedAlbumById(req, res) {
  try {
    const updatedAlbum = await KaviosPixAlbum.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedAlbum) {
      return res
        .status(200)
        .json({ message: "Album is updated", updatedAlbum });
    } else {
      return res.status(404).json({ message: "Album is not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while updating the album", error });
  }
}

async function deletedAlbumById(req, res) {
  try {
    const deletedAlbum = await KaviosPixAlbum.findByIdAndDelete(req.params.id);
    if (deletedAlbum) {
      return res
        .status(200)
        .json({ message: "Album is deleted", deletedAlbum });
    } else {
      return res.status(404).json({ message: "Album is not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while deleting the album", error });
  }
}
module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updatedAlbumById,
  deletedAlbumById,
};
