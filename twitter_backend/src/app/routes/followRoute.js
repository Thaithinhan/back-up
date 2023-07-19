const router = require('express').Router();
const followController = require('../controllers/followController');
const userMiddleware = require('../middlewares/userMiddleware');

//FOLLOW SOME USER
router.post('/following', userMiddleware.authMiddleware, followController.newFollowing);
router.get('/following/check/:id', userMiddleware.authMiddleware, followController.checkFollowing);
router.delete('/following/check/:id', userMiddleware.authMiddleware, followController.unFollowing);
router.get('/following-me', userMiddleware.authMiddleware, followController.getFollowing);
router.get('/following/:id', userMiddleware.authMiddleware, followController.getFollowingById);
router.get('/follower-me', userMiddleware.authMiddleware, followController.getFollowers);
router.get('/follower/:id', userMiddleware.authMiddleware, followController.getFollowerById);

module.exports = router;
