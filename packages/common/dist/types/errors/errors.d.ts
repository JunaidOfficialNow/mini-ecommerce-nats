export declare class HttpError extends Error {
    status: number;
    constructor(message: string, status: number);
}
export declare class ConflictError extends HttpError {
    constructor(message: string);
}
export declare class NotFoundException extends HttpError {
    constructor(message: string);
}
export declare class UnAuthorizedException extends HttpError {
    constructor(message: string);
}
export declare class ForbiddenException extends HttpError {
    constructor(message: string);
}
