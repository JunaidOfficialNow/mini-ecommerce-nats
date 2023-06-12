export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }


}






export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message || 'Conflict', 409)
  } 
}

export class NotFoundException extends HttpError {
  constructor(message: string) {
    super( message || 'Not found', 404);
  }
}

export class UnAuthorizedException extends HttpError {
  constructor(message: string) {
    super(message || 'unauthorized', 401);
  }
}

export class ForbiddenException extends HttpError {
  constructor(message: string) {
    super(message || 'Forbidden', 403)
  }
}

