import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().trim().min(2).max(25).required().messages({
    "string.empty": "El nombre es requerido",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar 25 caracteres",
    "any.required": "El nombre es requerido",
  }),

  image: joi.string().trim().uri().required().messages({
    "string.empty": "La imagen es requerida",
    "string.uri": "La imagen debe ser una URL válida",
    "any.required": "La imagen es requerida",
  }),

  email: joi.string().trim().lowercase().email().required().messages({
    "string.empty": "El email es requerido",
    "string.email": "El email debe ser válido",
    "any.required": "El email es requerido",
  }),

  password: joi.string().min(8).max(72).required().messages({
    "string.empty": "La contraseña es requerida",
    "string.min": "La contraseña debe tener al menos 8 caracteres",
    "string.max": "La contraseña no puede superar 72 caracteres",
    "any.required": "La contraseña es requerida",
  }),

  country: joi.string().trim().min(2).max(35).allow("").optional(),
});

export const signUpValidator = (req, res, next) => {
  const { error, value } = signUpSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};
