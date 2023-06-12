"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHandler = exports.GlobalErrorHandler = exports.isAdmin = exports.isAuthenticated = void 0;
const errors_1 = require("../errors/errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            throw new errors_1.UnAuthorizedException('need to be authenticated to access this resource');
        try {
            const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY);
            req.user = decodedToken;
            next();
        }
        catch (error) {
            throw new errors_1.UnAuthorizedException('invalid token');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        next(new errors_1.ForbiddenException('Only admins can access this route'));
    }
    next();
};
exports.isAdmin = isAdmin;
const GlobalErrorHandler = (err, req, res, next) => {
    let message = 'Internal Server Error';
    let status = 500;
    if (err instanceof errors_1.HttpError) {
        message = err.message;
        status = err.status;
    }
    res.status(status).json({
        error: {
            message,
            status
        }
    });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
const NotFoundHandler = (req, res) => {
    res.status(404).json({ message: 'End point not found' });
};
exports.NotFoundHandler = NotFoundHandler;
