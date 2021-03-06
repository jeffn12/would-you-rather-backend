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
    answers: [],
    questions: []
  });

  try {
    newUser.save((err, user) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        res.status(200).json({ user });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "POST /api/users - .save() had an error...", error });
  }
});

// Add the question id/answer to the user's answers array
router.put("/", (req, res, next) => {
  const { questionId, option, authedUser } = req.body;
  try {
    User.findByIdAndUpdate(
      { _id: authedUser },
      {
        $push: {
          answers: { [questionId]: option }
        }
      },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          res.status(500).json({
            message: "PUT /api/users server error...",
            error: err.message
          });
        } else {
          res.status(200).json(user);
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "PUT /api/users had an error...",
      error: error.message
    });
  }
});

/* DELETE a user. */
router.delete("/", (req, res, next) => {
  const { username } = req.body;
  try {
    User.findByIdAndDelete(username, (err, user) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        res
          .status(200)
          .json({ message: `User ${user.username} has been deleted` });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "DELETE /api/users - .findByIdAndDelete() had an error...",
      error
    });
  }
});

module.exports = router;
