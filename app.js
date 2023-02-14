const config = require("./utils/config");
const usersRouter = require('./controllers/users')
const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs")
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");
require('express-async-errors')

mongoose.set("strictQuery", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongoDb");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDb", error.message);
  });
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor)


app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
