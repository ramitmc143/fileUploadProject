const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/ramitdb')
  .then(() => {
    console.log("db connection is successfull")
  })
  .catch((err) => {
    console.log("no db connection",err)
  })
  