const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Define routes
app.use('/api', require('./routes/apiRoutes')(db));
app.use(require('./routes/htmlRoutes')(db));

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
