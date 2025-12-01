const { info, error } = require("./logger");

const requestLogger = (request, response, next) => {
  info("Method", request.method);
  info("Path", request.path);
  info("Body", request.body);
  info("------");
  next();
};

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  error(error.messege);

  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.messege });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknowEndpoint,
  errorHandler,
};
