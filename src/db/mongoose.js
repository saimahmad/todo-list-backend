const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
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
