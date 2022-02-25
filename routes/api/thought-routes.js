const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    // deleteReaction
} = require('../../controllers/thought-controller')

// route: /api/thoughts
router.route('/').get(getAllThoughts).post(createThought)

// route: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// route: /api/thoughts/:thoughtId/reactions
router.route('/thoughts/:thoughtId/reactions').put(addReaction).delete(deleteThought)

module.exports = router;