const express = require("express");
const app = express();
const muscicianRouter = require("../routes/musicians");
const bandRouter = require("../routes/bands");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/musicians", muscicianRouter);
app.use("/bands", bandRouter);

module.exports = app;
