const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const db = require("../models");
const {getErrorInfo,logErrorByHttpStatus} = require('../utils');

const logger = require('../utils/logger').getLogger('userController');

const User = db.user;

exports.register = async (req, res) => {

  try {
    // Get user input
    const { first_name, last_name, username, password } = req.body;

    // Validate user input
    if (!(username && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      username: username.toLowerCase(), // sanitize: convert username to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (error) {
    const { errorStatus, errorMsg } = getErrorInfo(error);
        logErrorByHttpStatus(
            errorStatus,
            `Failed to get credentials: ${errorMsg}`,
            logger
        );
        return res.status(errorStatus).json({
            message: errorMsg,
            status: errorStatus
        });
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }else{
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    const { errorStatus, errorMsg } = getErrorInfo(error);
        logErrorByHttpStatus(
            errorStatus,
            `Failed to get credentials: ${errorMsg}`,
            logger
        );
        return res.status(errorStatus).json({
            message: errorMsg,
            status: errorStatus
        });
  }
};