const Notification = require('../models/schemas/notification.schemas');
const Tweet = require('../models/schemas/tweet.schemas'); // tham chiếu đến mô hình Tweet

const createNotification = async ({ sender, receiver, type, tweetId }) => {
  try {
    const notification = new Notification({
      sender,
      receiver,
      type,
      tweetId,
    });

    await notification.save();

    // Không còn res.status(200).json nữa
    return { success: true, notification };
  } catch (error) {
    // Không còn res.status(500).json nữa
    console.error(error.message);
    return { success: false, error: error.message };
  }
};

//Lấy notification
const getNotifications = async (req, res) => {
  const { receiver } = req.params;

  try {
    let notifications = await Notification.find({ receiver }).populate('sender');
    notifications = await Promise.all(
      notifications.map(async (notification) => {
        // kiểm tra xem tweetId có tồn tại trong bảng Tweet không
        const tweetExists = await Tweet.findById(notification.tweetId);
        if (tweetExists) {
          return notification;
        } else {
          return null;
        }
      })
    );
    // loại bỏ những giá trị null
    notifications = notifications.filter((notification) => notification !== null);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createNotification, getNotifications };
