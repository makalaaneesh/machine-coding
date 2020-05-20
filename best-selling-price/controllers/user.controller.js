const User = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the User test controller!");
};

exports.user_create = function (req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    balances: {},
  });
  user
    .save()
    .then((doc) => {
      res.status(httpStatus.CREATED).send(doc);
    })
    .catch((err) => {
      if (err) {
        res.status(httpStatus.BAD_REQUEST).send(err);
        return next(err);
      }
    });
};

exports.user_details = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.user_update = function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    user
  ) {
    if (err) return next(err);
    console.log(user);
    res.send(user);
  });
};

exports.user_delete = function (req, res, next) {
  User.findOneAndDelete(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully");
  });
};

exports.users_list = function (req, res) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.send(users);
  });
};
