const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        // db.Workout.find({}, (err, data) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       res.json(data);
        //     }
        // });
      db.Workout.find({})
        .then(function(results) {
          res.json(results);
        })
        .catch(function(err){
          res.json(err);
        });
    });
  
    // PUT
    app.put("/api/workouts/:id", function(req, res) {
      db.Workout.updateOne({ _id: req.params.id },
        { $push: 
          { exercises: req.body }
        })
        .then(function(results) {
          res.json(results);
        })
        .catch(function(err) {
          res.json(err);
        }); 
    });
  
    app.post("/api/workouts", function(req, res) {
      // console.log("------------------- post: api/workouts -----------------------");
      // console.log(req.body);
      db.Workout.create(req.body)
        .then(function(dbWorkout) {
          res.json(dbWorkout);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  
    app.get("/api/workouts/range", function(req, res) {
        console.log("------------------- get: api/workouts/range -----------------------");

        // db.Workout.find({}, (err, data) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       res.json(data);
        //     }
        // });
    });

};