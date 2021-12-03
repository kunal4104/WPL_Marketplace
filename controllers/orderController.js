const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const query = Order.find({ user: req.params.id });
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// exports.getUserOrders = factory.getAll(Order);
exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateProduct = factory.updateOne(Order);
exports.deleteProduct = factory.deleteOne(Order);
