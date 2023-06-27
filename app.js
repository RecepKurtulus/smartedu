const express = require('express');
//Burada expressi require ederek çağırdık
const nodemon = require('nodemon');
const app = express();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
//mongoose paketini require ettik
const session=require('express-session');
const appRouter=require('./routes/pageRoute');
const courseRouter=require('./routes/courseRoute');
const categoryRouter=require('./routes/categoryRoute');
const userRouter=require('./routes/userRoute');
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
global.userIN=null;
global.loggendIN=false;
//Global Variable
app.use(express.static("public"));
//Burada expressi ana sunucu şablonu yaptık
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'my_keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/smartedu-db' })
}));
//Burada express sessionın çalışması için middleware olarak kullandık
app.use('*',(req,res,next) => {
  userIN=req.session.userID;
  
  
  next();
});
//Burada başta tanımladığımız global variable "userIN" null dı ama giriş yaptıktan sonra bunu userID'ye eşitledik ve artık true döndürmeye
//başladı artık user girişine ve çıkışına göre işlme yapabilicez
//MİDDLEWARES




app.use ('/',appRouter);
//Burada böyle bir istek gedi mi appRoteri kullan diyor
app.use ('/courses',courseRouter);
//Burada courses için istek geldi mi course routeri kullan diyoruz
app.use('/categories',categoryRouter);
//Burada categories için istek geldi mi category routeri kullan diyoruz
app.use('/register',appRouter)
//Burada register için istek geldi mi appRoterikullan diyoruz
app.use('/login',appRouter)
//Burada login için istek geldi mi appRoterikullan diyoruz
app.use('/user',userRouter)
//Burada user için istek geldi mi user routeri kullan diyoruz
const port = 3000;
app.listen(port,() => {
    console.log(`App started at ${port}`);}
    );
//Burada portu başltıp dinlemeye 3000 portundan başladık
