const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Comment';
const COLLECTION_NAME = 'Comments';

const commentSchema = new mongoose.Schema(
  {
    userId_comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    type: {
      type: String,
      enum: ['comment'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tweetParentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
      default: null,
    },
    hashtags: {
      type: [String],
      default: null,
    },
    mentions: {
      type: [mongoose.Schema.Types.ObjectId],
      default: null,
    },
    medias: {
      type: [String],
      default: null,
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// Export model
module.exports = mongoose.model(DOCUMENT_NAME, commentSchema);
