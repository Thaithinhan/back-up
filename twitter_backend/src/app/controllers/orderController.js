const Order = require('../models/schemas/order.schemas');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
