const express = require("express")
const router = express.Router();

const {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updatedAlbumById,
  deletedAlbumById
} = require("../controllers/album.controller");

router.post('/', createAlbum);
router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.post('/:id', updatedAlbumById);
router.delete('/:id', deletedAlbumById);

module.exports = router;