const { Router } = require("express");
const multerUpload = require('./helpers/multer-upload-image')

const {
  create,
  findAll,
  uploadImage,
  getProfileImage
} = require("./controller");

const router = new Router();

router.post("/", create);
router.get("/", findAll);
router.post('/image/:profileId', multerUpload('avatar'), uploadImage);
router.get("/image/:profileId", multerUpload("avatar"), getProfileImage);

module.exports = router;
