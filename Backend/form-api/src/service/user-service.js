import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserByEmailValidation, registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Email sudah digunakan");
    }

    return prismaClient.user.create({
        data: user,
        select: {
            email: true,
            nama: true
        }
    });
}

const getByEmail = async (email) => {
    email = validate(getUserByEmailValidation, email);

    const user = await prismaClient.user.findFirst({
        where: {
            email: email
        },
        select: {
            email: true,
            nama: true,
            telepon: true,
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const getUsers = async () => {
    return prismaClient.user.findMany({
        select: {
            email: true,
            nama: true,
            telepon: true,
        }
    });
}

export default {
    register,
    getByEmail,
    getUsers,
}