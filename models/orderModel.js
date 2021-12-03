const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'order requires a object Id!'],
  },
  total: {
    type: Number,
    required: [true, 'order requires a total price!'],
  },
  quantity: {
    type: Number,
    required: [true, 'order requires a some quantity'],
  },
  items: [
    {
      _id: mongoose.Schema.ObjectId,
      title: String,
      description: String,
      photo: String,
      category: String,
      color: String,
      size: String,
      material: String,
      qty: Number,
      price: Number,
      total: Number,
    },
  ],

  address: {
    firstName: String,
    lastName: String,
    street: String,
    pin: Number,
    state: String,
    country: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  status: {
    type: String,
    default: 'Placed',
    enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'],
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate('user');
  next();
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
