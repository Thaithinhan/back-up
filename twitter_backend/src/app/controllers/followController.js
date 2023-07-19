const UserSchema = require('../models/schemas/users.schemas'); //schemas User model
const FollowingSchema = require('../models/schemas/following.schemas');
const bcrypt = require('bcrypt'); //encode password
const jwt = require('jsonwebtoken');
const secret_key = require('../../configs/jwt.configs');
const generateAccessToken = require('../utils/accessToken');
const sendRegistrationEmail = require('../utils/mailer');
const { router } = require('../app');

//Add Following
const newFollowing = async (req, res) => {
  try {
    const current_userId = req.userId;
    const followed_userId = req.body._id;

    if (!current_userId) return res.status(401).json({ error: 'Unauthorized' });

    const newFollowing = new FollowingSchema({
      current_userId,
      followed_userId,
    });

    const savedFollowing = await newFollowing.save();
    res.status(201).json(savedFollowing);
  } catch (error) {
    console.error('Error creating new following', error);
    res.status(500).json({ error: 'Error creating new following' });
  }
};

//Check Following
const checkFollowing = async (req, res) => {
  try {
    const followed_userId = req.params.id; // Lấy thông tin người dùng từ id trong route
    const current_userId = req.userId; // Lấy thông tin người dùng hiện tại từ access token
    // console.log('followed_userId', followed_userId);
    // console.log('current_userId', current_userId);
    // Kiểm tra người dùng hiện tại đã follow user hay chưa
    const following = await FollowingSchema.findOne({
      current_userId: current_userId,
      followed_userId: followed_userId,
    });

    const isFollowing = !!following;
    res.status(200).json({ isFollowing: isFollowing });
  } catch (error) {
    console.error('Error getting user profile', error);
    res.status(500).json({ error: 'Error getting user follow' });
  }
};

//UNFOLLOW USER
const unFollowing = async (req, res) => {
  try {
    const followed_userId = req.params.id; // Lấy thông tin người dùng từ id trong route
    //     console.log(111111111111, followed_userId);
    const current_userId = req.userId; // Lấy thông tin người dùng hiện tại từ access token

    // Kiểm tra người dùng hiện tại đã follow user hay chưa
    const following = await FollowingSchema.findOneAndDelete({
      current_userId: current_userId,
      followed_userId: followed_userId,
    });

    if (following) {
      // Xóa thành công, `following` chứa thông tin của tài liệu bị xóa
      //  console.log('Unfollowed user:', following);
      res.status(200).json({ message: 'Unfollow Successfully' + following });
    } else {
      // Không tìm thấy tài liệu để xóa
      console.log('User not found or already unfollowed.');
    }
  } catch (error) {
    console.error('Error unfollowing user', error);
    res.status(500).json({ error: 'Error unfollowing user' });
  }
};

// Lấy danh sách người theo dõi của người dùng hiện tại
const getFollowers = async (req, res) => {
  try {
    const currentUserId = req.userId;

    console.log(11111, currentUserId);

    // Lấy danh sách người theo dõi (follower) của người dùng hiện tại
    const followers = await FollowingSchema.find({ followed_userId: currentUserId }).populate('current_userId');

    res.status(200).json(followers);
  } catch (error) {
    console.error('Error getting followers', error);
    res.status(500).json({ error: 'Error getting followers' });
  }
};

// Lấy danh sách người được theo dõi của người dùng hiện tại
const getFollowing = async (req, res) => {
  try {
    //     console.log('req', req);
    const currentUserId = req.userId;
    //     console.log(222222222222, currentUserId);

    // Lấy danh sách người được theo dõi (following) bởi người dùng hiện tại
    const following = await FollowingSchema.find({ current_userId: currentUserId }).populate('followed_userId');
    res.status(200).json(following);
  } catch (error) {
    console.error('Error getting following', error);
    res.status(500).json({ error: 'Error getting following' });
  }
};

//Lấy danh sách theo dõi của User theo Id
const getFollowingById = async (req, res) => {
  //   console.log(1111111111, req.params.id);

  try {
    //     console.log('req', req);
    const userId = req.params.id;
    //     console.log(1111111111, userId);

    // Lấy danh sách người được theo dõi (following) bởi người dùng hiện tại
    const following = await FollowingSchema.find({ current_userId: userId }).populate('followed_userId');
    res.status(200).json(following);
  } catch (error) {
    console.error('Error getting following', error);
    res.status(500).json({ error: 'Error getting following' });
  }
};

//Lấy danh sách người theo dõi của User theo Id
const getFollowerById = async (req, res) => {
  try {
    //     console.log('req', req);
    const userId = req.params.id;

    // Lấy danh sách người được theo dõi (following) bởi người dùng hiện tại
    const following = await FollowingSchema.find({ followed_userId: userId }).populate('current_userId');
    res.status(200).json(following);
  } catch (error) {
    console.error('Error getting following', error);
    res.status(500).json({ error: 'Error getting following' });
  }
};

module.exports = {
  getFollowers,
  getFollowing,
  newFollowing,
  unFollowing,
  checkFollowing,
  getFollowingById,
  getFollowerById,
};
