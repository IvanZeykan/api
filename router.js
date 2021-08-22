const { Router } = require("express");
const multerUpload = require('./helpers/multer-upload-image')

const {
  create,
  findOne,
  uploadImage,
  getProfileImage
} = require("./controller");

const router = new Router();

router.post("/", create);
router.get("/:profileId", findOne);
router.post('/image/:profileId', multerUpload('avatar'), uploadImage);
router.get("/image/:profileId", multerUpload("avatar"), getProfileImage);

module.exports = router;
