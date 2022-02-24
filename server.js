// requiring express
const express = require('express');
//grabbing connection folder
const db = require('./config/connection');
//grabbing routes
const routes = require('./routes');

// setting up PORT and server
const PORT = process.env.port || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//PORT
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});