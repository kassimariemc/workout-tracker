const express = require("express");
const router = express.Router();

module.exports = (db) => {
  
  router.get("/api/workouts", (req, res) => {
    db.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    }).catch(err => {
      res.json(err);
    });
  });
  
  router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  
  router.post("/api/workouts", (req, res) => {
    db.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // should sort be descending to get most recent workouts?? 
  router.get("/api/workouts/range", (req, res) => {
    db.find({}).sort({ day: 1 }).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // is this needed for anything??
  router.delete("/api/workouts", ({ body }, res) => {
    db.findByIdAndDelete(body.id);
  });

  return router;
}