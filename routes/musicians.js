const express = require("express");
const musicianRouter = express.Router();
const { Musician } = require("../models/index");
const { check, validationResult } = require("express-validator");

musicianRouter.get("/", async (req, res) => {
  const muscicians = await Musician.findAll();
  res.json(muscicians);
});

musicianRouter.get("/:id", async (req, res) => {
  const muscician = await Musician.findByPk(req.params.id);
  res.json(muscician);
});

musicianRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim().isLength({ min: 2, max: 20 }),
    check("instrument").not().isEmpty().trim().isLength({ min: 2, max: 20 }),
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

musicianRouter.put(
  "/:id",
  [
    check("name").not().isEmpty().trim().isLength({ min: 2, max: 20 }),
    check("instrument").not().isEmpty().trim().isLength({ min: 2, max: 20 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const updatedMusician = await Musician.update(req.body, {
          where: { id: req.params.id },
        });
        res.json(updatedMusician);
      }
    } catch (e) {
      next(e);
    }
  }
);

musicianRouter.delete("/:id", async (req, res) => {
  const deletedMusician = await Musician.destroy({
    where: { id: req.params.id },
  });

  res.json(deletedMusician);
});

module.exports = musicianRouter;
