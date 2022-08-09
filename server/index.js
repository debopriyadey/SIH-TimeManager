require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Credentials",true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cookieParser());
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

// simulate delay response
// app.use((req, res, next) => { 
//   setTimeout(() => next(), 3000);
// });
app.use('/', authRoute);
app.use(errorHandler);



const PORT = process.env.PORT || 5000
const dbURI = "mongodb+srv://sih:sih@cluster0.smvmbq5.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT, () => console.log("server running on port 5000")))
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);