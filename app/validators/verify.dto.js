import Joi from "joi";

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const userSchema = Joi.object({
  address: Joi.string().required().messages({
    "any.required": "'address' is required.",
  }),
  signature: Joi.string().required().messages({
    "any.required": "'signature' is required.",
  }),
});
