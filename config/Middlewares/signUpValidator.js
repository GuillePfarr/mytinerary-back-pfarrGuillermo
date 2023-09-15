import joi from "joi"

export const signUpValidator = (req, res, next) => {

const signUpValidator  = joi.object({
name: joi.string().min(2).max(25).required().messages({
"string.name":"",
"string.empty":"",
"string.min":"",
"string.max":"",
"string.required":"",
}),

image : joi.string().required().uri().required(),
email : joi.string().required().email().required(),
password : joi.string().min(6).max(40).required(),
country : joi.string().min(2).max(35),
})

const validate = signUpValidator.validate(req.body, {abortEarly: false})

if(validate.error){
return res.json({success:false, errors: validate.error.details})
}

next()
}

