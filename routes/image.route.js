const express = require("express");
const router = express.Router();

const {
  uploadImage,
  getImages,
  getImageById,
  updateImageById,
  deleteImageById,
} = require("../controllers/image.controller");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({storage});

router.post("/",upload.single("image"), uploadImage);
router.get("/", getImages);
router.get("/:id", getImageById);
router.post("/:id", updateImageById);
router.delete("/:id", deleteImageById);

module.exports = router;
