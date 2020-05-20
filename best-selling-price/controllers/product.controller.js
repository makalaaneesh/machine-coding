const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const httpStatus = require("http-status");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Product test controller!");
};

exports.product_create = function (req, res) {
  Product.create(req.body, (err, product) => {
    if (err) {
      return next(err);
    }
    res.status(httpStatus.CREATED).send(product);
  });
};

exports.product_details = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_update = function (req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    product
  ) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_delete = function (req, res) {
  Product.findOneAndDelete(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully");
  });
};

exports.products_list = function (req, res) {
  Product.find({}, function (err, products) {
    if (err) return next(err);
    res.send(products);
  });
};

exports.product_purchase = function (req, res) {
  Purchase.create(req.body, (err, purchase) => {
    if (err) {
      return next(err);
    }
    res.status(httpStatus.CREATED).send(purchase);
  });
};
