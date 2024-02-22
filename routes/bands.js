const express = require("express");
const bandRouter = express.Router();
const { Band, Musician } = require("../models/index");
const { check, validationResult } = require("express-validator");

bandRouter.get("/", async (req, res) => {
  const bands = await Band.findAll({ include: Musician });
  res.json(bands);
});

module.exports = bandRouter;
