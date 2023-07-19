const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const DOCUMENT_NAME = 'following';
const COLLECTION_NAME = 'Following';

const followingsSchema = new mongoose.Schema(
  {
    current_userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    followed_userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, followingsSchema);
