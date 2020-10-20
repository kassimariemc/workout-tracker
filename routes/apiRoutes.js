const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // working
  router.get("/api/workouts", (req, res) => {
    db.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    }).catch(err => {
      res.json(err);
    });
  });
  // needs work
  router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // needs work
  router.post("/api/workouts", (req, res) => {
    db.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // working
  router.get("/api/workouts/range", (req, res) => {
    db.find({}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });

  router.delete("/api/workouts", ({ body }, res) => {
    db.findByIdAndDelete(body.id);
  });

  return router;
}