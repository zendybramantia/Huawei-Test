import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getByEmail = async (req, res, next) => {
    try {
        const email = req.params.email;
        const result = await userService.getByEmail(email);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}


const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    getByEmail,
    getUsers,
}