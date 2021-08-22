const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  picture: {
    type: String,
  },
});

module.exports = model("Profile", ProfileSchema);
