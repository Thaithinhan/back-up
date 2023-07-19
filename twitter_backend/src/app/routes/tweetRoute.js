const router = require('express').Router();
const tweetController = require('../controllers/tweetController');
const userMiddleware = require('../middlewares/userMiddleware');

const upload = require('../middlewares/multerMiddleware');

//MAKE NEW TWEET
router.post('/', upload.array('images', 3), userMiddleware.authMiddleware, tweetController.createTweet);
router.get('/mytweet', userMiddleware.authMiddleware, tweetController.getTweetForCurrentUser);
router.get('/getTweetByTime', userMiddleware.authMiddleware, tweetController.getAllTweetByTime);
router.get('/user/:id', tweetController.getAllTweetByIdUser);
router.get('/:id', tweetController.getTweetByIdTweet);
router.delete('/:id', userMiddleware.authMiddleware, tweetController.deleteById);
router.patch('/:id', userMiddleware.authMiddleware, tweetController.editTweetById);
router.patch('/:id/like', userMiddleware.authMiddleware, tweetController.likeTweet);
router.patch('/:id/unlike', userMiddleware.authMiddleware, tweetController.unlikeTweet);
router.get('/:id/countComment', userMiddleware.authMiddleware, tweetController.commentCount);

module.exports = router;
