const mongoose = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      // required: true,
      // maxLength: 150,
    },
    username: {
      type: String,
      // required: true,
    }, // optional
    email: {
      type: String,
      unique: true,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    email_verify_token: {
      type: String,
      default: '',
    }, // jwt hoặc '' nếu đã xác thực email
    forgot_password_token: {
      type: String,
      default: '',
    }, // jwt hoặc '' nếu đã xác thực email
    verify: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    role: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    avatar: {
      type: String,
      default: 'https://sangtao.sawaco.com.vn/wwwimages/Avatar/defaultavatar.png',
    }, // optional image
    cover_photo: {
      type: String,
      default:
        'https://hocnhanh.vn/wp-content/uploads/2022/02/ultimate-guide-to-your-twitter-header-size-and-cover-photo-twitter-600x240.png',
    }, // optional image
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
