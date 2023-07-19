const router = require('express').Router();
const chatController = require('../controllers/chatController');
const userMiddleware = require('../middlewares/userMiddleware');

router.post('/chats', chatController.createChat)


module.exports = router;
