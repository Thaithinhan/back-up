const UserSchema = require('../models/schemas/users.schemas'); //schemas User model
const FollowingSchema = require('../models/schemas/following.schemas');
const OrderSchema = require('../models/schemas/order.schemas');
const bcrypt = require('bcrypt'); //encode password
const jwt = require('jsonwebtoken');
const secret_key = require('../../configs/jwt.configs');
const generateAccessToken = require('../utils/accessToken');
const sendRegistrationEmail = require('../utils/mailer');
const mongoose = require('mongoose');
// const { router } = require('../app');

//REGISTER Users
const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    console.log('req', req.body);
    //Encode password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserSchema({ fullname, username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    //Gửi email
    await sendRegistrationEmail(savedUser);

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' + ' ' + error });
  }
};

//LOGIN Users

const login = async (req, res) => {
  try {
    // Xác thực thông tin đăng nhập
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Tạo access token
    const accessToken = generateAccessToken(user._id);

    // Trả về access token trong phản hồi
    // console.log(accessToken);
    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error loggin user' + ' ' + error });
  }
};

//GET ALL Users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users', error);
    res.status(500).json({ error: 'Error getting all users' });
  }
};

//GET ME PROFILE
const getMeProfile = async (req, res) => {
  try {
    const userId = req.userId; // Lấy thông tin người dùng từ access token
    // console.log(222222, userId);
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile', error);
    res.status(500).json({ error: 'Error getting user profile' });
  }
};

//Get Suggest Follow
const suggestFollow = async (req, res) => {
  try {
    const userId = req.userId; // Lấy thông tin người dùng từ access token
    // console.log(222222, userId);
    const suggestedUsers = await UserSchema.aggregate([
      // Bước 1: Tìm tất cả người dùng chưa được theo dõi và không phải là người dùng hiện tại
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId.createFromHexString(userId) },
        },
      },
      // Bước 2: Thêm trường "isFollowed" để kiểm tra xem người dùng hiện tại đã theo dõi người dùng này hay chưa
      {
        $lookup: {
          from: 'Following',
          let: { followedUserId: '$_id', currentUser: mongoose.Types.ObjectId.createFromHexString(userId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followed_userId', '$$followedUserId'] },
                    { $eq: ['$current_userId', '$$currentUser'] },
                  ],
                },
              },
            },
          ],
          as: 'isFollowed',
        },
      },
      // Bước 3: Loại bỏ người dùng đã được theo dõi
      {
        $match: {
          isFollowed: { $eq: [] },
        },
      },
      // Bước 4: Sắp xếp theo thời gian tạo ngược dần
      {
        $sort: {
          createdAt: -1,
        },
      },
      // Bước 5: Giới hạn số lượng kết quả gợi ý
      {
        $limit: 10,
      },
    ]);
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error('Error getting suggested users', error);
    res.status(500).json({ error: 'Error getting suggested users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy thông tin người dùng url
    // console.log(222222, userId);
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile', error);
    res.status(500).json({ error: 'Error getting user profile' });
  }
};

// EDIT PROFILE :
const editProfile = async (req, res) => {
  try {
    const userId = req.userId; // Lấy thông tin người dùng từ access token
    // console.log(22222222222222, userId);
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Kiểm tra xem trong request có avatar được gửi lên hay không
    // console.log(1111111, req.files);

    if (req.files) {
      if (req.files['avatar']) {
        user.avatar = `${req.protocol + '://' + req.get('host')}/images/${req.files['avatar'][0].filename}`; // Trường hợp này giả sử rằng tệp ảnh được lưu trong thư mục /public/images
      }
      if (req.files['cover_photo']) {
        user.cover_photo = `${req.protocol + '://' + req.get('host')}/images/${req.files['cover_photo'][0].filename}`; // Trường hợp này giả sử rằng tệp ảnh được lưu trong thư mục /public/images
      }
    }

    // Kiểm tra và cập nhật các trường khác
    if (req.body.fullname) user.fullname = req.body.fullname;
    if (req.body.username) user.username = req.body.username;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile', error);
    res.status(500).json({ error: 'Error updating user profile' });
  }
};

//GET FOLLOWING USERS
const getFollowingUsers = async (req, res) => {
  try {
    const currentUserId = req.userId; // Lấy thông tin người dùng từ access token

    const followings = await FollowingSchema.find({ current_userId: currentUserId }).populate('followed_userId');

    if (!followings) {
      return res.status(404).json({ error: 'No following users found' });
    }

    res.status(200).json(followings.map((following) => following.followed_userId));
  } catch (error) {
    console.error('Error getting following users', error);
    res.status(500).json({ error: 'Error getting following users' });
  }
};

//CHỨC NĂNG MUA TICK XANH
const buyVerification = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(1111111111111111, req.body);
    const { amount, verificationType } = req.body;

    // Giả định thanh toán thành công

    // Tạo đơn hàng mới
    const order = new OrderSchema({
      userId: userId,
      amount: amount,
      verificationType: verificationType,
    });

    await order.save();

    // Cập nhật trạng thái xác minh
    let verificationStatus = 0;
    if (verificationType === 'monthly') {
      verificationStatus = 1;
    } else if (verificationType === 'permanent') {
      verificationStatus = 2;
    }

    await UserSchema.findByIdAndUpdate(userId, { verify: verificationStatus });

    res.status(200).send({ message: 'Verification successful' });
  } catch (error) {
    console.log(error);
  }
};

const checkVerification = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy user ID từ URL

    // Tìm user với userId
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Kiểm tra trường verify của user
    if (user.verify > 0) {
      res.status(200).json({ isVerified: true });
    } else {
      res.status(200).json({ isVerified: false });
    }
  } catch (error) {
    console.error('Error checking verification status', error);
    res.status(500).json({ error: 'Error checking verification status' });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getMeProfile,
  suggestFollow,
  getUserById,
  editProfile,
  getFollowingUsers,
  buyVerification,
  checkVerification,
};
