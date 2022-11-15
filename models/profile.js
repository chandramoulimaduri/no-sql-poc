const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: { type: String, unique: true },
  group: { type: String},
  color: { type: String},
});

module.exports = mongoose.model("profile", profileSchema);
