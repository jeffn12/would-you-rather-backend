var express = require("express");
var router = express.Router();

const User = require("../../models/user");

/* GET users listing. */
router.get("/", (req, res, next) => {
  try {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        res.status(200).json({ users: Object.assign({}, users) });
      }
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "GET /api/users - User.find() had an error...", err });
  }
});

/* POST a user. */
router.post("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* DELETE a user. */
router.delete("/", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
