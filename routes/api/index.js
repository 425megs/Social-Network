// Route handler middleware
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// middleware, /user path, userRoutes function
router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;