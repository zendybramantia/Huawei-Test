import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    nama: Joi.string().max(100).required(),
    telepon: Joi.string().max(100).required()
});

const getUserByEmailValidation = Joi.string().max(100).required();

export{
    registerUserValidation,
    getUserByEmailValidation
};