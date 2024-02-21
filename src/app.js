const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");
const { check, validationResult } = require("express-validator");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (req, res) => {
  const muscicians = await Musician.findAll();
  res.json(muscicians);
});

app.get("/musicians/:id", async (req, res) => {
  const muscician = await Musician.findByPk(req.params.id);
  res.json(muscician);
});

app.post(
  "/musicians",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const newMusician = await Musician.create({ ...req.body });
        res.json(newMusician);
      }
    } catch (e) {
      next(e);
    }
  }
);

app.put("/musicians/:id", async (req, res) => {
  const updatedMusician = await Musician.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedMusician);
});

app.delete("/musicians/:id", async (req, res) => {
  const deletedMusician = await Musician.destroy({
    where: { id: req.params.id },
  });

  res.json(deletedMusician);
});

module.exports = app;
