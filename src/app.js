const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const contactsRouter = require("./routes/contactsRouter");
const errorHandler = require("./middlewares/errorHandler");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log(error));
app.use(express.json());
app.use(volleyball);
app.use(
  cors({
    origin: "*",
  })
);
app.use(errorHandler);

app.use("/api/contacts", contactsRouter);

module.exports = app;
