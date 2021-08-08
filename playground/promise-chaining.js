require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('60fd80026c9fd310cc076e93').then(data => {
//   return Task.countDocuments({completed: false});  
// }).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.log(error)
// })


//Using async and await 

removeAndCount = async (id) => {
  await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments({completed: false});
  return count;
}

removeAndCount("60f9b68acdbfd016e07cd7f1").then(data => {
  console.log(data);
}).catch(error => {
  console.log(error)
})