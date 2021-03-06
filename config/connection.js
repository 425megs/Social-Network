// requiring mongoose
const { connect, connection } = require('mongoose');

// setting up mongoose
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = connection;