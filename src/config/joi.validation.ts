import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_CONNECTION_STRING: Joi.required(),
});
