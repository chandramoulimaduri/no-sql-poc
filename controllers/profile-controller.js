const db = require("../models");
const Profile = db.profile;
const helper = require("../helpers/profile-helper");
const {getErrorInfo,logErrorByHttpStatus} = require('../utils');

const logger = require('../utils/logger').getLogger('profileController');

// Create or update user profile
const createProfile = async (groupId, user, color) => {
  // Save Profile
  let query = { user: user };
  let profile = {
    user: user,
    color: color,
    group: groupId,
  };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await Profile.findOneAndUpdate(query, profile, options);
};

// Create and Save a new Profile
exports.create = async (req, res) => {

  logger.info('creating  Profiles');
  try {
    // Validate request
    helper.validateRequestBodyExists(req.body);
    for (const groupId in req.body) {
      const group = req.body[groupId];
      // validate group 
      helper.validateIsObject(group);
      for (const user in group) {
        await createProfile(groupId, user, group[user]);
      }
    }
    return res.status(201).json({
      payload: req.body,
      status: 201,
    });
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

// Retrieve all Profiles.
exports.findAll = async (req, res) => {
  try {
    const organize = req.query.organize || "color";
    const value = req.query.value || "group";

    const profiles = await Profile.find({});
    const organized_results = helper.organizeProfile(profiles, organize, value);
    res.status(200).send(organized_results);
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

// Retrieve all Profiles by color
exports.findByColor = async (req, res) => {
  try {
    const { color } = req.params;
    const profiles = await Profile.find({ color: color }).select({
      user: 1,
      color: 1,
      group: 1,
      _id: 0,
    });
    const organized_results = helper.organizeProfile(
      profiles,
      "color",
      "group"
    );
    res.status(200).send(organized_results);
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

// Retrieve all Profiles by group
exports.findByGroup = async (req, res) => {
  try {
    const { group } = req.params;
    const profiles = await Profile.find({ group: group }).select({
      user: 1,
      color: 1,
      group: 1,
      _id: 0,
    });
    const organized_results = helper.organizeProfile(
      profiles,
      "group",
      "color"
    );
    res.status(200).send(organized_results);
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
