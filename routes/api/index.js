// Route handler middleware
const router = require('express').Router();
const userRoutes = require('./user-routes');

// middleware, /user path, userRoutes function
router.use('/user', userRoutes)


module.exports = router;