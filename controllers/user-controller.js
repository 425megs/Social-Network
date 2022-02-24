const { User } = require('../models');

module.exports = {
    //GET all users
    getAllUsers(req, res){
        User.find()
        //if no errors, return users data
        .then((users) => res.status(200).json(users))
        //return 500 and the error if users data can't be retrieved
        .catch((err) => res.status(500).json(err))
    },
    //GET user by id
    getSingleUser(req, res){
        // find user by id typed in parameters
        User.findOne({_id: req.params.userId})
            // referencing thoughts in User model
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // referencing friends in User model
            .populate({
                path: 'friends',
                select: '-__v'
            })
            // selecting from User model
            .select('-__v')
            .then(userData => {
                // if no user data is found, send an error message
                if (!userData){
                    res.status(404).json({ message: 'No user was found.'})
                    return
                }
                res.status(200).json(userData)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    // POST new user
    createUser(req, res){
        // use the info entered in req.body
        User.create(req.body)
            // create the new user with username + email
            .then(newUser => res.status(200).json(newUser))
            .catch(err => {
                res.status(500).json(err)
            })
    },
    // PUT update single user by id
    updateUser(req, res){
        // Find user by id
        User.findOneAndUpdate(
            {_id: req.params.userId},
            req.body,
            // replace previous data with new data
            { runValidators: true, new: true }
        )
        .then(updateUser => {
            // if there is no id matching what was input in parameters, throw an error
            if(!updateUser){
                res.status(404).json({ message: 'No user was found.'})
                return
            }
            // otherwise display updated user data
            res.status(200).json(updateUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    //DELETE user by id
    deleteUser(req, res){
        // find user by id
        User.findOneAndDelete(
            {_id: req.params.userId}
        )
        .then(deleteUser => {
            // if no user has the entered id number, throw an error
            if (!deleteUser){
                res.status(404).json({ message: 'No user was found.'})
                return
            }
            // otherwise delete user
            res.status(200).json(deleteUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    //PUT to add a friend by userId + friendId
    addFriend(req, res){
        // find user whose friends list we want to update
        User.findOneAndUpdate(
            {_id: req.params.userId},
            // update their friends array to add friend by friendId
            { $push: { friends: req.params.friendId } },
            // replace previous data with new data
            { runValidators: true, new: true }
        )
        .then(newFriend => {
            // if no users match id entered, throw an error
            if (!newFriend){
                res.status(404).json({ message: 'No friends for you here'})
                return
            }
            // otherwise add new friend to new array
            res.status(200).json(newFriend)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    //DELETE friend by userId + FriendID
    deleteFriend(req, res){
        // find user whose friends list we want to edit
        User.findOneAndUpdate(
            {_id: req.params.userId},
            // remove enetered friendId from friends array
            { $pull: { friends: req.params.friendId } },
            // replace previous data with new data
            { new: true }
        )
        .then(badFriend => {
            // if no friends match friendId entered, throw an error
            if (!badFriend){
                res.status(404).json({ message: 'Don\'t worry, you\'re not friends with them anyway!'})
                return
            }
            // otherwise, replace array with newly updated one
            res.status(200).json(badFriend)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}