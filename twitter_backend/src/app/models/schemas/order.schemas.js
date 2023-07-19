const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verificationType: {
      type: String,
      enum: ['monthly', 'permanent'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      // Nếu gói là "monthly", thiết lập ngày hết hạn là một tháng sau ngày tạo
      default: function () {
        if (this.verificationType === 'monthly') {
          let oneMonthFromNow = new Date();
          oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
          return oneMonthFromNow;
        }
      },
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export model
module.exports = mongoose.model(DOCUMENT_NAME, orderSchema);
