var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const questionSchema = new Schema({
  _id: { type: String, required: true },
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

export default mongoose.model("Question", questionSchema);
