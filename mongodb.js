//CRUD operations

const { MongoClient, ObjectID } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    //    db.collection('users').insertOne({
    //        name: 'saim',
    //        age: 24
    //    }, (error, result) => {
    //        if(error) return console.log('Unable to insert user')
    //         console.log(result.ops)
    //    })

    //    db.collection('users').insertMany([
    //     {
    //         name: 'saim',
    //         age: 24
    //     },
    //     {
    //         name: 'saim2',
    //         age: 25
    //     }
    //    ],(error, result) => {
    //     if(error) return console.log('Unable to insert user')
    //      console.log(result.ops)
    // } )

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Make chrome extension",
    //       completed: false,
    //     },
    //     {
    //       description: "eat",
    //       completed: true,
    //     },
    //     {
    //       description: "learn node js",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert tasks");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').findOne({name: 'saim22'}, (error, user) => {
    //     if(error) console.log("unable to find user");

    //     console.log(user)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //   _id: new ObjectID("60abd06f47ec740ae0f52642")
    // }, {
    //   $set: {
    //     name: "mike"
    //   }
    // })

    // updatePromise.then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    //db.collection('tasks').deleteOne({completed: true}).then(result => console.log(result)).catch(error => console.log(error))

  }
);
