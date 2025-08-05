/**
 * RequestError to be used when request
 * has reached a valid endpoint, but it
 * is malformed, incorrect, or missing information.
 * Should **not** be used for missing authentication
 * information --> in that case, use AuthenticationError
 * instead.
 */
export class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestError';
    this.statusCode = 400;
  }
}
Object.freeze(RequestError.prototype);
