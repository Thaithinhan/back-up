const router = require('express').Router();
const tweetController = require('../controllers/tweetController');
const commentController = require('../controllers/commentController');
const userMiddleware = require('../middlewares/userMiddleware');
const upload = require('../middlewares/multerMiddleware');

//MAKE NEW comment
router.post('/', userMiddleware.authMiddleware, upload.array('images', 2), commentController.createComment);
//GET ALL COMMENTS
router.get('/:parentid/all-comment', commentController.getCommentsByTweetId);

module.exports = router;
