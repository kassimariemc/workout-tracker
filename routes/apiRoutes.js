const express = require("express");
const router = express.Router();
const moment = require('moment');

module.exports = (db) => {
  // Get all data
  router.get("/api/workouts", (req, res) => {
    db.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    }).catch(err => {
      res.json(err);
    });
  });
  // Add 1 exercise to specific workout by id
  router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // create new workout
  router.post("/api/workouts", (req, res) => {
    db.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // Get most recent 7 workouts, then send data starting with Sunday on to optimize chart
  router.get("/api/workouts/range", (req, res) => {
    db.find({}).sort({ day: -1 }).limit(7)
    .then(dbWorkout => {
      dbWorkout.reverse();
      let startDay;
      let data = [];
      for (let i = 0; i < dbWorkout.length; i++) {
        if(moment(dbWorkout[i].day).format('dddd') === 'Sunday') {
          startDay = i;
        }
      }
      for (let i = startDay; i < dbWorkout.length; i++) {
        data.push(dbWorkout[i]);
      }
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
  });
  // Delete any workouts in which the exercise data is empty
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