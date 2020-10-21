const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3003;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require('./models/Workout.js');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {
  console.log("Connected to Database");
  }).catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
  });

// Define routes
app.use(require('./routes/apiRoutes.js')(db));
app.use(require('./routes/htmlRoutes.js')(db));

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
