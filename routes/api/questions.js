var express = require("express");
var router = express.Router();

const Question = require("../../models/question");
const User = require("../../models/user");

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
  const { author, optionOne, optionTwo } = req.body;
  const newQuestion = new Question({
    author,
    timestamp: new Date().getTime(),
    optionOne: {
      votes: [],
      text: optionOne
    },
    optionTwo: {
      votes: [],
      text: optionTwo
    }
  });
  try {
    newQuestion.save((err, question) => {
      if (err) {
        res.status(500).json({ message: err.message, err });
      } else {
        User.findByIdAndUpdate(
          { _id: author },
          {
            $push: {
              questions: question._id
            }
          },
          { new: true, useFindAndModify: false },
          (err) => {
            if (err) {
              res.status(500).json({ message: err.message, err });
              Question.findByIdAndDelete(question._id, (err) => {
                res
                  .status(500)
                  .json({ message: "houston, we have a problem..." });
              });
            } else {
              res.status(200).json({ question });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(400).json({
      message: "POST /api/questions - .save() had an error...",
      error
    });
  }
});

// Add the user who answered the question to the options
router.put("/", (req, res, next) => {
  const { id, option, authedUser } = req.body;
  const pathToUpdate = `${option}.votes`;
  try {
    Question.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          [`${option}.votes`]: authedUser
        }
      },
      { new: true, useFindAndModify: false },
      (err, question) => {
        if (err) {
          res.status(500).json({
            message: "PUT /api/questions server error...",
            error
          });
        } else {
          res.status(200).json(question);
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "PUT /api/questions had an error...",
      error: error.message
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
