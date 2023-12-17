import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserByEmailValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Email already used!");
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            email: true,
            name: true
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
            name: true,
            phone: true,
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found!");
    }

    return user;
}

const getUsers = async () => {
    return prismaClient.user.findMany({
        select: {
            email: true,
            name: true,
            phone: true,
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Email or password wrong!");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password wrong!");
    }

    const payloadData = {
        email: user.email,
    };

    const token = jwt.sign(payloadData, process.env.APP_JWT_SECRET );
    
    return token;
}

export default {
    register,
    getByEmail,
    getUsers,
    login,
}