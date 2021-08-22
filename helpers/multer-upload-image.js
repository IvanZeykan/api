const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.substring(
        file.mimetype.indexOf("/") + 1
      )}`
    );
  },
});
const upload = multer({ storage });

module.exports = (name) => {
    return upload.single(name)
}