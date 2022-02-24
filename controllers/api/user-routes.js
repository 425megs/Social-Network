const { User } = require("../models");

// GET all users

// GET user by __id, also populate thought and friend data

// POST new user

module.exports = {
    getAllUser(req, res){
        User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                if (!userData){
                    res.status(404).json({ message: 'no user with that id'})
                    return
                }
                res.status(200).json(userData)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    newUser(req, res){
        User.create(req.body)
            .then(newUser => res.status(200).json(newUser))
            .catch(err => {
                res.status(500).json(err)
            })
    },
}

// Update existing user
editUser(req,res){
    User.findOneAndUpdate(
        {_id: req.params.userId},
        req.body,
        {runValidator: true, new:true}
    )
    .then(editUser => {
        if(!editUser){
            res.status(404).json({message: 'no user with that id found'})
            return
        }
        res.status(200).json(editUser)
    })
    .catch(err => {
        res.status(500).json(err)
    }),

    deleteUser(req, res){
        User.findOneAndDelete(
            {_id: req.params.userId}
        )
        .then(deleteUser => {
            if (!deleteUser){
                res.status(404).json({message: 'user dont exist'})
                return
            }
            res.status(200).json(deleteUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $push: {friends: req.params.friendId}},
            {runValidators: true, new:true}
        )
        .then(newFriend => {
            if (!newFriend){
                res.status(404).json({message: 'no friends for you'})
                return
            }
            res.status(200).json(newFriend)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    deleteFriend(req,res){
        User.findOneAndUpdate(
        {_id: req.params.userId},
        { $push: {friends: req.params.friendId}},
        {new:true}
    )
    .then(byeFriend => {
        if (!byeFriend){
            res.status(404).json({message: 'no friends for you'})
            return
        }
        res.status(200).json(byeFriend)
    })
    .catch(err => {
        res.status(500).json(err)
    })
},

}