// підключаємся до бази даних 
const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    // строка підключення на локальному пк + localhost:27017 name of bd
    MongoClient.connect('mongodb://localhost:27017/bookstore')
        .then((client) => {
          dbConnection = client.db()
          return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
  },
  getDb: () => dbConnection
};
