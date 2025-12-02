const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

info("Conectandose a MongoDB");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("Conectado a MongoDB", process.env.MONGODB_URI);
  })
  .catch((expressError) => {
    error("Error conectandose a MongoDB", expressError.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
