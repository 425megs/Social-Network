const { User } = require("../models");

module.exports = {
    getAllUser(req, res){
        User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req,res){
        User.findOne({_id: req.params.id})
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

// GET all users

// GET user by __id, also populate thought and friend data

// POST new user