const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        db.Workout.find({}, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.json(data);
            }
        });
    });
  
    // PUT
    app.put("/api/workouts/:id", function(req, res) {
      // 2; Add a join to include all of the Author's Posts here
        console.log("------------------- put: api/workouts/:id -----------------------");
    //   db.Author.findOne({
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then(function(dbAuthor) {
    //     res.json(dbAuthor);
    //   });
    });
  
    app.post("/api/workouts", function(req, res) {
      console.log("------------------- post: api/workouts -----------------------");
      console.log(req.body);
      db.Workout.create(req.body).then(function(dbWorkout) {
        
        console.log(dbWorkout);
        res.json(dbWorkout);
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