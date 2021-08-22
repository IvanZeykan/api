const Joi = require("joi");

const Validations = {
  profileSchemaValidation: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().email()
  }),
};

module.exports = Validations
