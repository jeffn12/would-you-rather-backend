var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const questionSchema = new Schema({
  author: { type: String, required: true },
  timestamp: { type: Number, required: true },
  optionOne: {
    votes: { type: [String], default: [] },
    text: { type: String, required: true }
  },
  optionTwo: {
    votes: { type: [String], default: [] },
    text: { type: String, required: true }
  }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
