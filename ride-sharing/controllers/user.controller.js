const User = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the User test controller!");
};

exports.user_create = function (req, res, next) {
  let lat = req.body.lat;
  let long = req.body.long;
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    user_type: req.body.user_type,
    location: { type: "Point", coordinates: [long, lat] },
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
    res.send(user);
  });
};
exports.user_update_location = function (req, res, next) {
  let new_lat = req.body.lat;
  let new_long = req.body.long;

  User.findByIdAndUpdate(
    req.params.id,
    { $set: { location: { type: "Point", coordinates: [new_long, new_lat] } } },
    function (err, user) {
      if (err) return next(err);
      res.send(user);
    }
  );
};

exports.user_toggle_availability = function (req, res, next) {
  new_availabilty = req.body.availability === "true";
  //console.log(new_availabilty);
  User.findByIdAndUpdate(
    req.params.id,
    { $set: { availability: new_availabilty } },
    function (err, user) {
      if (err) return next(err);
      res.send(user);
    }
  );
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

exports.list_available_drivers = function (req, res, next) {
  User.find(
    { $and: [{ availability: true }, { user_type: "driver" }] },
    function (err, users) {
      if (err) return next(err);
      res.send(users);
    }
  );
};
