import Joi from "joi";

export const SignUpSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3).max(30),
        cpassword: Joi.string().valid(Joi.ref("password")).required(),
        age: Joi.number().required(),
        gender: Joi.string().required(),
        phone: Joi.string().required(),
  
  });

  

 export const SignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(30),
});

