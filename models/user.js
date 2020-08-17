var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  avatarURL: { type: String, required: false },
  answers: { type: {}, required: true },
  questions: { type: [String] }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
