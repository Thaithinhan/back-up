const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'Notification';

const notificationSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    type: String,
    tweetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', require: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export model
module.exports = mongoose.model(DOCUMENT_NAME, notificationSchema);
