const router = require('express').Router();
const notificationController = require('../controllers/notificationController');
const commentController = require('../controllers/commentController');
const userMiddleware = require('../middlewares/userMiddleware');
const upload = require('../middlewares/multerMiddleware');

router.get('/:receiver', userMiddleware.authMiddleware, notificationController.getNotifications);

module.exports = router;
