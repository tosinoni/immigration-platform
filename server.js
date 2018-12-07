
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require('dotenv');
const helmet = require('helmet');
const userRoutes = require('./routes/users.js');
const userController = require('./controllers/users.js');


dotenv.config();

const API_PORT = process.env.PORT || 3001;
const app = express();

const dbRoute = process.env.DB_LINK;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(helmet());


app.get('/api', (req, res) => {
	res.json({success:true, message: "API root."})
})

app.use('/api/users', userRoutes)

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

userController.createAdmin();