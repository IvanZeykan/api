const Profile = require("./schema");
const { profileSchemaValidation } = require("./validations");
const sizeOf = require("image-size");
const sharp = require("sharp");

const postController = {
  async create(req, res, next) {
    try {
      const { name, surname, email } = req.body;
      const validationResult = profileSchemaValidation.validate(req.body);
      if (validationResult.error)
        return res.status(400).json({ error: validationResult.error });

      const profile = await Profile.create({ name, surname, email });
      res.status(200).json(profile);
    } catch (e) {
      next(e);
    }
  },

  async uploadImage(req, res, next) {
    try {
      const profile = await Profile.findOne({ _id: req.params.profileId });
      if (!profile) {
        return res
          .status(404)
          .json({
            message: `Profile with id: ${req.params.profileId} not found `,
          });
      }
      const pathToProfileImage = `uploads/${req.params.profileId}.jpeg`;

      const dimensions = sizeOf(req.file.path);
      const { width, height } = dimensions;

      await sharp(req.file.path)
        .extract({
          width: 200,
          height: 200,
          left: Math.trunc(width / 2),
          top: Math.trunc(height / 2),
        })
        .toFile(pathToProfileImage);

      profile.picture = pathToProfileImage;
      await profile.save();
      res.status(200).json(profile);
    } catch (e) {
      next(e);
    }
  },

  async getProfileImage(req, res, next) {
    try {
      const profile = await Profile.findOne({ _id: req.params.profileId });
      if (!profile) {
        return res.status(404).json({
          message: `Profile with id: ${req.params.profileId} not found `,
        });
      }
      if (!profile.picture) return res.status(404).json({
        message: 'Profile picture not founds'
      })
      res.sendFile(`${__dirname}/${profile.picture}`);
    } catch (e) {
      next(e)
    }
  },

  async findAll(req, res, next) {
    try {
      const allProfiles = await Profile.find();
      res.status(200).json(allProfiles);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = postController;
