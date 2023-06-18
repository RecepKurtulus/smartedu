const express = require('express');
//Burada expressi require ederek çağırdık
const nodemon = require('nodemon');
const app = express();
const mongoose = require('mongoose');
//mongoose paketini require ettik

const appRouter=require('./routes/pageRoute');
const courseRouter=require('./routes/courseRoute');
const categoryRouter=require('./routes/categoryRoute');
//APP routerler

mongoose.connect('mongodb://127.0.0.1/smartedu-db', {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('MongoDB connection error:', error);
  process.exit(1);
});

//Burada mongodb databaseine bağlantımızı yaptık 


app.set('view engine','ejs');
//Template Engine
app.use(express.static("public"))
//Burada expressi ana sunucu şablonu yaptık
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//MİDDLEWARES




app.use ('/',appRouter);
//Burada böyle bir istek gedi mi appRoteri kullan diyor
app.use ('/courses',courseRouter);
//Burada courses için istek geldi mi course routeri kullan diyoruz
app.use('/categories',categoryRouter);
//Burada categories için istek geldi mi category routeri kullan diyoruz
const port = 3000;
app.listen(port,() => {
    console.log(`App started at ${port}`);}
    );
//Burada portu başltıp dinlemeye 3000 portundan başladık
