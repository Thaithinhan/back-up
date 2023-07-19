const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const DOCUMENT_NAME = 'Chat';
const COLLECTION_NAME = 'Chats';

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, chatSchema);
