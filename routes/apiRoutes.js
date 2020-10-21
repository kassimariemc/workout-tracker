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
 
  router.get("/api/workouts/range", (req, res) => {
    db.find({}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });

  router.delete("/api/workouts", (req, res) => {
    db.deleteMany({ exercises: [] })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });

  return router;
}