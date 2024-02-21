const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.get("/musicians", async (req, res) => {
  const muscicians = await Musician.findAll();
  res.json(muscicians);
});

app.get("/musicians/:id", async (req, res) => {
  const muscician = await Musician.findByPk(req.params.id);
  res.json(muscician);
});

module.exports = app;
