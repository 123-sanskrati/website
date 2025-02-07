const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors=require('cors');
require('dotenv').config();
require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter');  
//const AuthRouter=require('express').Router();

const PORT = process.env.PORT || 8080;
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(bodyParser.json());
app.use(express.json());  // ✅ Add this before using routes
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors(
  {
    origin: 'http://localhost:3000',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
  }
));

app.use('/auth',AuthRouter);
app.listen(PORT, () => {
  console.log(`server run suceessfulty ${PORT}`);
});

