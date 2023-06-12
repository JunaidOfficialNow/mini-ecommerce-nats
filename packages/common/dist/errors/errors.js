"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.UnAuthorizedException = exports.NotFoundException = exports.ConflictError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
class ConflictError extends HttpError {
    constructor(message) {
        super(message || 'Conflict', 409);
    }
}
exports.ConflictError = ConflictError;
class NotFoundException extends HttpError {
    constructor(message) {
        super(message || 'Not found', 404);
    }
}
exports.NotFoundException = NotFoundException;
class UnAuthorizedException extends HttpError {
    constructor(message) {
        super(message || 'unauthorized', 401);
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
class ForbiddenException extends HttpError {
    constructor(message) {
        super(message || 'Forbidden', 403);
    }
}
exports.ForbiddenException = ForbiddenException;
