import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    phone: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const getUserByEmailValidation = Joi.string().max(100).required();

export{
    registerUserValidation,
    getUserByEmailValidation
};