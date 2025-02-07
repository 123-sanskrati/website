const mongoose = require('mongoose');
require('dotenv').config();  // Load .env variables

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
   // useNewUrlParser: true,
   // useUnifiedTopology: true,


.then(()=>{
    console.log('mongodb connected');
}).catch((err)=>{
    console.log('mongodb connection error',err);
});