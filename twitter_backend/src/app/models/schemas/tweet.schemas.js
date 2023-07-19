const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Tweet';
const COLLECTION_NAME = 'Tweets';

const tweetSchema = new mongoose.Schema(
  {
    userId_tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    type: {
      type: String,
      enum: ['tweet', 'comment', 'retweet', 'quote'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
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
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export model
module.exports = mongoose.model(DOCUMENT_NAME, tweetSchema);
