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
    res.status(400).json({
      message: "GET /api/questions - Question.find() had an error...",
      error
    });
  }
});

/* POST a question. */
router.post("/", (req, res, next) => {
  const { author, optionOneText, optionTwoText } = req.body;
  const newQuestion = new Question({
    author,
    timestamp: new Date().getTime(),
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  });
  try {
    newQuestion.save((err, question) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        res
          .status(200)
          .json({ message: `question saved: ${question._id}`, question });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "POST /api/questions - .save() had an error...",
      error
    });
  }
});

/* DELETE a question listing. */
router.delete("/", (req, res, next) => {
  const { id } = req.body;
  try {
    Question.findByIdAndDelete(id, (err, question) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        res.status(200).json({ message: `deleted question ${id}`, question });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "DELETE /api/questions - .findByIdAndDelete() had an error...",
      error
    });
  }
});

module.exports = router;
