const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL;
db.profile = require("./profile.js");
db.user = require("./user.js");

module.exports = db;
