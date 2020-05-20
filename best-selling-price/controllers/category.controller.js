const Category = require("../models/category.model");
const httpStatus = require("http-status");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Category test controller!");
};

exports.category_create = function (req, res) {
  Category.create(req.body, (err, category) => {
    if (err) {
      return next(err);
    }
    res.status(httpStatus.CREATED).send(category);
  });
};

exports.category_details = function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    if (err) return next(err);
    res.send(category);
  });
};

exports.category_update = function (req, res) {
  Category.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    product
  ) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.category_delete = function (req, res) {
  Category.findOneAndDelete(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully");
  });
};

exports.categories_list = function (req, res) {
  Category.find({}, function (err, categories) {
    if (err) return next(err);
    res.send(categories);
  });
};
