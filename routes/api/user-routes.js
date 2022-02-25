const router = require('express').Router();
// function names from our user-controller file
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// route: /api/user
router.route('/').get(getAllUsers).post(createUser)

// route: /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// route: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(addFriend).delete(deleteFriend)

module.exports = router;