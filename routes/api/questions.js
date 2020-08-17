var express = require("express");
var router = express.Router();

const Question = require("../../models/question");

/* GET questions listings. */
router.get("/", (req, res, next) => {
  try {
    Question.find({}, (err, questions) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        let questionsObj = {};
        questions.forEach((question) => {
          questionsObj[question._id] = question;
        });
        res.status(200).json({ questions: questionsObj });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "GET /api/users - User.find() had an error...", error });
  }
});

/* POST a question. */
router.post("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* DELETE a question listing. */
router.delete("/", (req, res, next) => {
  res.send("respond with a resource");
});

module.exports = router;
