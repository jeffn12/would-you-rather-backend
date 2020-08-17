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
        let usersObj = {};
        users.forEach((user) => {
          usersObj[user.username] = user;
        });
        res.status(200).json({ users: usersObj });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "GET /api/users - User.find() had an error...", error });
  }
});

/* POST a user. */
router.post("/", (req, res, next) => {
  const { username, name, avatarURL } = req.body;
  const newUser = new User({
    _id: username,
    username,
    name,
    avatarURL: avatarURL ? avatarURL : "",
    answers: {},
    questions: []
  });

  try {
    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
        console.log("error in save new user...", newUser);
      } else {
        res
          .status(200)
          .json({ message: `User ${user.username} has been created` });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "POST /api/users - .save() had an error...", error });
  }
});

/* DELETE a user. */
router.delete("/", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
