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
      db.Workout.aggregate(
        [
          {
            $addFields: {
              totalDuration: { $sum: "$exercises.duration" }
            }
          }
        ])
        .then(function(results) {

          console.log("------------results-----------------");
          console.log(results);
          // db.Workout.aggregate([
          //   {
          //     $addFields: {
          //       totalDuration: { $sum: "$ex"}
          //     }
          //   }
          // ])
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
// 
        // db.Workout.find({}).sort({ day: -1 }).limit(7)
        db.Workout.aggregate(
          [
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
              }
            }
          ]).sort({ day: -1 }).limit(7)
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });

};