const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
require ("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync({
  force:false
}) .then(() => {
  console.log("synced");

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });

}) .catch((err) => {
  console.log(err);
})


