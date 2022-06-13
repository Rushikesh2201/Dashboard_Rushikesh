const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");
const routes = require("./routes");
require("dotenv").config();
const Sequelize = require("sequelize");

//***init middleware***//
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// app.get('/' , (req,res) =>{
//     res.send('Welcome To Dashboard App...')
//     })

// //***API routes***//
// app.use('/api/users', require('./controllers/routes/api/user_info'));

// app.use(bodyParser.json())

const host = "localhost";
const database = "thePantry";
const port2 = "5432";

app.use("/api", routes);
const connectDB = async () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host,
      port2,
      dialect: "postgres",
      logging: false,
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:");
  }
};
connectDB();
const port = process.env.PORT || 8080;
app.listen(port);

module.exports = app;
