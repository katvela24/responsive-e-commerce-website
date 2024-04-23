const express = require('express');
const routes = require('./routes');
// const sequelize = require('sequelize');
const { Sequelize } = require('./config/connection');
require ("dotenv").config();

// import sequelize connection
const sequelize = new Sequelize (
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, 
    {
      host: "localhost", dialect: 'mysql'
    }
)

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync({
  force:true
}) .then(() => {
  console.log("synced");
}) .catch((err) => {
  console.log(err);
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
