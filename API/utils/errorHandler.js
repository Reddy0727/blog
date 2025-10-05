export const errorHandler = (statusCode, message, errorCode = "SERVER_ERROR") => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errorCode = errorCode;
  return error;
};
