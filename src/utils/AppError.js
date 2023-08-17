
// 1. AppError class is used to handle errors in the application
export class AppError extends Error {
  constructor(message,statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}