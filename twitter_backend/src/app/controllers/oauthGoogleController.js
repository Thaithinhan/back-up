const { OAuth2Client } = require('google-auth-library');
const UserSchema = require('../models/schemas/users.schemas');
const jwt = require('jsonwebtoken');
const secret_key = require('../../configs/jwt.configs');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTHORIZED_REDIRECT_URI,
} = require('../../configs/oauthGoogle.config');

// Khởi tạo OAuth2 client
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_AUTHORIZED_REDIRECT_URI);

const getOauthGoogle = async (req, res) => {
  const { code } = req.query;
  console.log(111111111, code);
  try {
    // Đổi mã thông báo lấy mã truy cập và mã thông báo Google
    const { tokens } = await client.getToken(code);
    const { id_token } = tokens;

    // Xác thực mã thông báo Google
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email } = ticket.getPayload();

    // Kiểm tra email đã tồn tại trong cơ sở dữ liệu hay chưa
    let user = await UserSchema.findOne({ email });

    if (!user) {
      // Nếu email chưa tồn tại, tạo người dùng mới trong cơ sở dữ liệu
      user = new UserSchema({ email });
      await user.save();
    }

    // Tạo access token
    const accessToken = jwt.sign({ userId: user._id }, secret_key);

    // Trả về access token cho client
    res.json({ accessToken, user: user });
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    res.status(500).json({ error: 'Error authenticating with Google' });
  }
};

module.exports = { getOauthGoogle };
