const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
var utils = require("../services/utils");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Booking test controller!");
};

exports.create = function (req, res, next) {
  var promise1 = new Promise((resolve, reject) => {
    User.findById(req.body.rider_id, function (err, doc) {
      if (err) {
        return reject();
      }
      resolve(doc.location);
    });
  });
  var promise2 = new Promise((resolve, reject) => {
    User.findById(req.body.driver_id, function (err, doc) {
      if (err) {
        return reject();
      }
      resolve(doc.location);
    });
  });

  Promise.all([promise1, promise2]).then((values) => {
    driver_location = values[1];
    rider_location = values[0];

    driver_lat = driver_location.coordinates[1];
    driver_long = driver_location.coordinates[0];

    rider_lat = rider_location.coordinates[1];
    rider_long = rider_location.coordinates[0];

    distance = utils.distance_function2(
      driver_lat,
      rider_lat,
      driver_long,
      rider_long,
      "K"
    );
    console.log(distance);

    if (parseFloat(distance) < 10) {
      const booking = new Booking({
        rider_id: req.body.rider_id,
        driver_id: req.body.driver_id,
        status: req.body.status,
      });
      booking
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
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        error: "Driver should be within 5kms of radius from the rider",
      });
    }
  });
};

exports.update_status = function (req, res, next) {
  Booking.findByIdAndUpdate(
    req.params.id,
    { $set: { status: req.body.status } },
    function (err, booking) {
      if (err) return next(err);
      res.send(booking);
    }
  );
};

exports.get_all_bookings = function (req, res, next) {
  Booking.find({}, function (err, bookings) {
    if (err) return next(err);
    res.send(bookings);
  });
};

exports.get_bookings_by_user = function (req, res, next) {
  Booking.find({ user_id: req.params.user_id }, function (err, booking) {
    if (err) return next(err);
    res.send(booking);
  });
};
