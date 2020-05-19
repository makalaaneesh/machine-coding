const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Transaction test controller!");
};

exports.transaction_create = function (req, res, next) {
  //   transaction_array = [];
  //   var promise = new Promise((resolve, reject) => {
  //     transaction_array.push({
  //       from_user: req.body.from_user,
  //       to_user: req.body.to_user,
  //       description: req.body.description,
  //       credit: req.body.credit,
  //       debit: req.body.debit,
  //     });
  //     transaction_array.push({
  //       from_user: req.body.to_user,
  //       to_user: req.body.from_user,
  //       description: req.body.description,
  //       credit: req.body.debit,
  //       debit: req.body.credit,
  //     });
  //     return resolve(transaction_array);
  //   });
  //   promise.then((transaction_array) => {
  //     Transaction.insertMany(transaction_array)
  //       .then(function (docs) {
  //         res.status(httpStatus.CREATED).send(docs);
  //       })
  //       .catch(function (err) {
  //         res.status(httpStatus.BAD_REQUEST).send(err);
  //         return next(err);
  //       });
  //   });
  var promise = new Promise((resolve, reject) => {
    type = req.body.type;
    amount = parseInt(req.body.amount);
    switch (type) {
      // TYPE 1: Paid by you and split equally
      case 1:
      // TYPE 4: Paid by them and split equally
      case 4:
        amount = amount / 2;
        break;
      // TYPE 2: You owe the full amount
      case 2:
        amount = amount * -1;
        break;
      // TYPE 3: They owe the full amount
      case 3:
        break;
    }

    if (type == 1) {
    } else if (type == 2) {
    }
    User.findById(req.body.to_user, function (err, doc) {
      if (err) return next(err);

      key = req.body.from_user;
      amount = parseInt(req.body.amount);

      if (doc.balances.has(key)) {
        current_balance = doc.balances.get(key);
        current_balance += amount;
        doc.balances.set(key, current_balance);
      } else {
        doc.balances.set(key, amount);
      }
      doc.save();
      return resolve();
    });
  });
  promise.then(() => {
    User.findById(req.body.from_user, function (err, doc) {
      if (err) return next(err);

      key = req.body.to_user;
      amount = parseInt(req.body.amount);

      if (doc.balances.has(key)) {
        current_balance = doc.balances.get(key);
        current_balance += amount;
        doc.balances.set(key, current_balance);
      } else {
        doc.balances.set(key, amount);
      }
      doc
        .save()
        .then((doc) => {
          res.status(httpStatus.CREATED).send(doc);
        })
        .catch((err) => {
          res.status(httpStatus.BAD_REQUEST).send(err);
          return next(err);
        });
    });
  });
};

exports.transaction_details = function (req, res, next) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) return next(err);
    res.send(transaction);
  });
};

exports.transactions_by_userid = function (req, res, next) {
  Transaction.find(
    {
      $or: [{ from_user: req.params.userid }, { to_user: req.params.userid }],
    },
    function (err, transaction) {
      if (err) return next(err);
      res.send(transaction);
    }
  );
};

exports.balance_with_user = function (req, res, next) {
  Transaction.find;
};

exports.transaction_update = function (req, res, next) {
  Transaction.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    transaction
  ) {
    if (err) return next(err);
    res.send(transaction);
  });
};

exports.transaction_delete = function (req, res, next) {
  Transaction.findOneAndDelete(req.params.id, function (err) {
    if (err) return next(err);
    res.send("Deleted successfully");
  });
};

exports.transactions_list = function (req, res) {
  Transaction.find({}, function (err, transactions) {
    if (err) return next(err);
    res.send(transactions);
  });
};
