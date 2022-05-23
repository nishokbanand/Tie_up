/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const userProfile = require("../models/userprofile.model");
var profileuploader = async function (req, res) {
  try {
    var user = await userProfile.findOne({
      email: req.body.email,
    });
    if (user == null) {
      a = await userProfile.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        aadhar_number: req.body.aadhar_number,
        twitter_acc: req.body.twitter_acc,
        linkedIn_acc: req.body.linkedIn_acc,
        addrline1: req.body.addrline1,
        addrline2: req.body.addrline2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        profile_pic: req.body.profile_pic,
        about: req.body.about,
      });
    } else {
      a = await userProfile.updateOne(
        {
          username: req.body.username,
        },
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          aadhar_number: req.body.aadhar_number,
          twitter_acc: req.body.twitter_acc,
          linkedIn_acc: req.body.linkedIn_acc,
          addrline1: req.body.addrline1,
          addrline2: req.body.addrline2,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
          profile_pic: req.body.profile_pic,
          about: req.body.about,
        }
      );
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { profileuploader };
