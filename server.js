const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require('./models/Workout.js');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Define routes
app.use(require('./routes/apiRoutes.js')(db));
app.use(require('./routes/htmlRoutes.js')(db));

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
