const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .populate({
            path: "reactions",
            select: "-__v",
          })
        .select('-__v')
            //if no errors, return thought data
            .then((thoughts) => res.status(200).json(thoughts))
            //return 500 and the error if thought data can't be retrieved
            .catch((err) => res.status(500).json(err))
    },

    // GET thought by Id
    getSingleThought(req, res) {
        // find thought by id typed in parameters
        Thought.findOne({ _id: req.params.thoughtId })
        .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
            .then(thoughtData => {
                // if no thought data is found, send an error message
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thoughts floating around here.' })
                    return
                }
                res.status(200).json(thoughtData)
            })
            
            .catch(err => {
                res.status(500).json(err)
            })
    },

    // POST create new thought to associated user
    createThought(req, res) {
        Thought.create(req.body)
          .then((newThought) => {
            return User.findOneAndUpdate(
              {
                username: req.body.username,
              },
              { $push: { thoughts: newThought._id } },
              { runValidators: true, new: true }
            );
          })
          .then((data) => {
            if (!data) {
              res.status(404).json({ message: "No user found." });
              return;
            }
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
    },

    // PUT update a thought by id
    updateThought(req, res) {
        // Find thought by id
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            // replace previous data with new data
            { runValidators: true, new: true }
        )
            .then(updateThought => {
                // if there is no id matching what was input in parameters, throw an error
                if (!updateThought) {
                    res.status(404).json({ message: 'No thoughts here.' })
                    return
                }
                // otherwise display updated thought
                res.status(200).json(updateThought)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    // DELETE thought by id
    deleteThought(req, res) {
        // find thought by id
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId }
        )
            .then(deleteThought => {
                // if no thought has the entered id number, throw an error
                if (!deleteThought) {
                    res.status(404).json({ message: 'No thoughts here.' })
                    return
                }
                // otherwise delete thought with associated id
                res.status(200).json(deleteThought)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    // POST create reaction stored in a single thought's reaction array field
    addReaction(req, res) {
        // find user whose friends list we want to update
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // update their friends array to add friend by friendId
            { $push: { reactions: req.body } },
            // replace previous data with new data
            { runValidators: true, new: true }
        )
            .then(newReaction => {
                // if no users match id entered, throw an error
                if (!newReaction) {
                    res.status(404).json({ message: 'Maybe you should keep this one to yourself...' })
                    return
                }
                // otherwise add new friend to new array
                res.status(200).json(newReaction)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    // DELETE a reaction by reactionId
    deleteReaction(req, res) {
        // find reaction we want to delete
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // remove enetered thoughtId from reactions array
            { $pull: { reactions: {reactionId: req.params.reactionId } }
            },
            // replace previous data with new data
            { new: true }
        )
            .then(reaction => {
                // if no friends match friendId entered, throw an error
                if (!reaction) {
                    res.status(404).json({ message: 'No one needed to hear this anyway!' })
                    return
                }
                // otherwise, replace array with newly updated one
                res.status(200).json(reaction)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
};