const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const httpStatus = require("http-status");
const _ = require("lodash");

//Simple version, without validation or sanitation
exports.test = function (req, res, next) {
  res.send("Greetings from the Product test controller!");
};

exports.product_create = function (req, res, next) {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category_id: req.body.category_id,
    buys: {},
  });
  product
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

exports.product_details = function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_update = function (req, res, next) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    product
  ) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_delete = function (req, res, next) {
  Product.findOneAndDelete(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully");
  });
};

exports.products_list = function (req, res, next) {
  Product.find({}, function (err, products) {
    if (err) return next(err);
    res.send(products);
  });
};

exports.product_purchase = function (req, res, next) {
  Product.findById(req.body.product_id, function (err, product) {
    if (err) {
      console.log(err);
      res.status(httpStatus.BAD_REQUEST).send(err);
      return next(err);
    }
    key = req.body.user_id;

    if (product.buys.has(key)) {
      times_bought = product.buys.get(key);
      times_bought += 1;
      product.buys.set(key, times_bought);
    } else {
      product.buys.set(key, 1);
    }
    product.save().then((err, product) => {
      if (err) {
        res.status(httpStatus.BAD_REQUEST).send(err);
        return next(err);
      }
      res.send(product);
    });
  });
};

exports.product_best_seller = function (req, res, next) {
  Product.find({}, function (err, products) {
    if (err) return next(err);
    product = {};
    _.forEach(products, function (o) {
      max = 0;
      if (_.size(o.buys) > max) {
        max = _.size(o.buys);
        product = o;
      }
    });
    res.send(product);
  });
};
