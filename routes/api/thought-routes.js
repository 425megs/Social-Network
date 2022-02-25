const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// actual route: /api/thoughts
router.route('/').get(getAllThoughts).post(createThought)

// actual route: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// actual route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').put(addReaction)

// actual route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;