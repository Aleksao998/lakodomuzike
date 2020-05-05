const express = require("express");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users-controllers');

const User = require('../models/User');


const router = express.Router();

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router.use(protect);

//Just admin can see all users and create new users
router.route('/').get(advancedResults(User), authorize('admin'), getUsers).post(authorize('admin'), createUser);

router.route('/:id').get(getUser).put(authorize('admin'), updateUser).delete(deleteUser);

module.exports = router;
