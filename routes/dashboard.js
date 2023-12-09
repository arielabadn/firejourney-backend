const router = require("express").Router();
const dbModel = require('../dbModel')

router.get("/stages", (req, res) => {
  dbModel.getStages()
    .then(stages => {
      res.status(200).json({
                success: true,
                message: "successful",
                stages: stages,
                //cookies: req.cookies
              });
    })
    .catch(error => {
      res.status(500).send(error)
    })
  });

//   try {
//     const stagesQuery = await dbClient.query("SELECT * FROM fire_stages");
//     if(stagesQuery.rows.length > 0){
//       stages = stagesQuery.rows;
//       res.status(200).json({
//         success: true,
//         message: "successful",
//         stages: stages,
//         //cookies: req.cookies
//       });
//     } 
//     } catch (error) {
//       console.log(error, error.message)
//     }
// });

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         success:false,
//         message: "failure",
//     });
// });

module.exports = router