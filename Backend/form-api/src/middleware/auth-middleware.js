import jwt from 'jsonwebtoken';

function jwtAuthorizationMiddleware(allowFail) {
    return async (req, res, next) => {
        try {
            var jwtSecret = process.env.APP_JWT_SECRET;

            if (typeof jwtSecret === 'undefined') {
                jwtSecret = '';
            }

            if (jwtSecret === '') {
                console.warn('jwt secret is empty for authorization');
            }

            const authHeader =
                req.header('authorization') || req.header('Authorization');

            if (typeof authHeader === 'undefined') {
                throw new Error('Unauthorized');
            }

            const headerSplit = authHeader.split(' ');
            if (headerSplit.length !== 2) {
                throw new Error('Unauthorized');
            }

            const token = headerSplit[1];
            const payload = jwt.verify(token, jwtSecret || '');
            req.user = payload;
            next();
        } catch (e) {
            if (allowFail) {
                return next();
            }
            return res.sendStatus(401);
        }
    };
}

export{
    jwtAuthorizationMiddleware
}