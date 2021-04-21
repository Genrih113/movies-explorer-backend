const router = require('express').Router();
const { validateUpdateUserReqBody } = require('../middlewares/celebrate-req-validators');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateUpdateUserReqBody, updateUserInfo);

module.exports = router;
