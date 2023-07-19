const Tweet = require('../models/schemas/tweet.schemas');
const Following = require('../models/schemas/following.schemas');
const Notification = require('../models/schemas/notification.schemas');
const notificationController = require('../controllers/notificationController');
const mongoose = require('mongoose');

const createTweet = async (req, res) => {
  const userId_tweet = req.userId;
  const { type, content, parentId } = req.body;

  // console.log(1111111, req.files);
  const medias = req.files.map(
    (file) => req.protocol + '://' + req.get('host') + '/' + file.fieldname + '/' + file.filename
  ); // Lấy đường dẫn của các hình ảnh

  try {
    // Kiểm tra nếu trường medias không tồn tại trong req.body, gán giá trị mặc định là null
    const mediaArray = medias || null;
    const tweetParentId = parentId || null;

    // Tạo một đối tượng tweet mới theo current user
    const newTweet = new Tweet({
      userId_tweet,
      type,
      content,
      medias: mediaArray,
      parentId: tweetParentId,
    });

    // Lưu tweet mới vào cơ sở dữ liệu
    const savedTweet = await newTweet.save();

    res.status(200).json({ success: true, message: 'Tweet created successfully', tweet: savedTweet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create tweet', error });
  }
};

// RENDER TWEET CHO CURRENT USERS
const getTweetForCurrentUser = async (req, res) => {
  const userId = req.userId;

  try {
    // Lấy danh sách tweet của người dùng hiện tại dựa trên userId
    const tweets = await Tweet.find({ userId_tweet: userId, type: 'tweet' })
      .sort('-createdAt')
      .populate('userId_tweet');

    res.status(200).json({ success: true, tweets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

// RENDER NEW TWEET CHO CURRENT USERS
const getAllTweetByTime = async (req, res) => {
  const userId = req.userId;

  try {
    // Lấy danh sách người mà người dùng hiện tại đang theo dõi từ bảng Following
    const followings = await Following.find({ current_userId: userId });

    // Tạo một mảng chứa danh sách userId mà người dùng hiện tại đang theo dõi
    const followingIds = followings.map((following) => following?.followed_userId);

    // Thêm userId của người dùng hiện tại vào danh sách
    followingIds.push(new mongoose.Types.ObjectId(userId));
    // console.log(2222222222, followingIds);

    // Lấy các tweets của người dùng hiện tại và những người mà họ đang theo dõi,
    // hoặc các tweet có lượt like trên 50, sắp xếp theo thời gian tạo (mới nhất)
    const tweets = await Tweet.aggregate([
      {
        $addFields: {
          likeCount: { $size: '$likes' },
        },
      },
      {
        $match: {
          $or: [
            { userId_tweet: { $in: followingIds }, type: 'tweet' },
            { likeCount: { $gt: 50 }, type: 'tweet' },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    // Populate userId_tweet vì aggregate không tự động populate
    const populatedTweets = await Tweet.populate(tweets, { path: 'userId_tweet' });

    // console.log(1111111111, tweets);

    res.status(200).json({ success: true, tweets: populatedTweets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

//RENDER TWEETS THEO ID
const getAllTweetByIdUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Tìm kiếm tất cả các tweets của một người dùng dựa trên userId được cung cấp
    const tweets = await Tweet.find({ userId_tweet: userId, type: 'tweet' })
      .sort('-createdAt')
      .populate('userId_tweet');

    res.status(200).json({ success: true, tweets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

//RENDER TWEET BY TWEET ID
const getTweetByIdTweet = async (req, res) => {
  const tweetId = req.params.id;

  try {
    // Tìm kiếm tất cả các tweets của một người dùng dựa trên userId được cung cấp
    const tweet = await Tweet.findById(tweetId).populate('userId_tweet');

    // Kiểm tra nếu không tìm thấy tweet
    if (!tweet) {
      return res.status(404).json({ success: false, message: 'Tweet not found' });
    }

    res.status(200).json({ success: true, tweet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

//DELETE TWEET THEO ID TWEET
const deleteById = async (req, res) => {
  const tweetId = req.params.id; // Lấy id từ parameters

  try {
    // Tìm và xóa tweet dựa trên id
    const deletedTweet = await Tweet.findByIdAndRemove(tweetId);

    // Kiểm tra nếu không tìm thấy tweet
    if (!deletedTweet) {
      return res.status(404).json({ success: false, message: 'Tweet not found' });
    }
    res.status(200).json({ success: true, message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete tweet', error });
  }
};

//EDIT TWEET BY ID TWEET
const editTweetById = async (req, res) => {
  const tweetId = req.params.id; // Lấy id từ parameters

  const { content } = req.body; // Lấy nội dung mới từ body

  try {
    // Tìm và cập nhật tweet dựa trên id
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { content }, // Cập nhật các trường này
      { new: true } // Option này trả về document sau khi đã được cập nhật
    );

    // Kiểm tra nếu không tìm thấy tweet
    if (!updatedTweet) {
      return res.status(404).json({ success: false, message: 'Tweet not found' });
    }
    res.status(200).json({ success: true, message: 'Tweet updated successfully', tweet: updatedTweet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update tweet', error });
  }
};

//LIKE A TWEET
const likeTweet = async (req, res) => {
  const tweetId = req.params.id; // Lấy id của tweet từ parameters
  const userId = req.userId; // Lấy id của người dùng từ token

  try {
    // Tìm và cập nhật tweet dựa trên id, thêm userId vào mảng likes
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $addToSet: { likes: userId } }, // Thêm userId vào mảng likes
      { new: true } // Option này trả về document sau khi đã được cập nhật
    ).populate('userId_tweet');

    // Kiểm tra nếu không tìm thấy tweet
    if (!updatedTweet) {
      return res.status(404).json({ success: false, message: 'Tweet not found' });
    }

    // Gửi thông báo tới người tạo tweet (chỉ khi người like không phải là chính người tạo tweet)
    if (userId.toString() !== updatedTweet.userId_tweet._id.toString()) {
      // Tạo notification
      const notification = new Notification({
        sender: userId,
        receiver: updatedTweet.userId_tweet._id,
        type: 'like',
        tweetId: tweetId,
      });
      await notification.save();

      // Sử dụng socket.io để gửi thông báo
      const io = req.app.get('socketio');
      io.emit('notification', { receiverId: updatedTweet.userId_tweet._id, type: 'like' });
    }

    res.status(200).json({ success: true, message: 'Tweet liked successfully', tweet: updatedTweet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to like tweet', error });
  }
};

//UNLIKE A TWEET
const unlikeTweet = async (req, res) => {
  const tweetId = req.params.id; // Lấy id của tweet từ parameters
  const userId = req.userId; // Lấy id của người dùng từ token

  try {
    // Tìm và cập nhật tweet dựa trên id, xóa userId khỏi mảng likes
    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $pull: { likes: userId } }, // Xóa userId khỏi mảng likes
      { new: true } // Option này trả về document sau khi đã được cập nhật
    ).populate('userId_tweet');

    // Kiểm tra nếu không tìm thấy tweet
    if (!updatedTweet) {
      return res.status(404).json({ success: false, message: 'Tweet not found' });
    }
    res.status(200).json({ success: true, message: 'Tweet unliked successfully', tweet: updatedTweet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to unlike tweet', error });
  }
};

//LẤY SỐ LƯỢNG COMMNET CỦA MỘT BÀI TWEET
const commentCount = async (req, res) => {
  try {
    const tweetId = req.params.id;
    console.log(111111111111111, tweetId);
    const count = await Tweet.countDocuments({ parentId: tweetId, type: 'comment' });
    return res.status(200).json({ commentCount: count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createTweet,
  getTweetForCurrentUser,
  getAllTweetByTime,
  getAllTweetByIdUser,
  getTweetByIdTweet,
  deleteById,
  editTweetById,
  likeTweet,
  unlikeTweet,
  commentCount,
};
