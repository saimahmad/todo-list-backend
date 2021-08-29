const mongoose = require("mongoose");
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-list-api"
mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

