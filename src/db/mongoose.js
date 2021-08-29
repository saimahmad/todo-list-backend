const mongoose = require("mongoose");
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-list-api"
mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});






// const me = new User({
//     name: 'saim',
//     age: 24,
//     email: 'ahmad.saim@gmail.com',
//     password: 'saim123'
// })

// me.save().then(response => console.log(response)).catch(error => console.log(error))



// const task = new Task({
//   description: "Learning Node js",
//   completed: false,
// });

// task
//   .save()
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));
