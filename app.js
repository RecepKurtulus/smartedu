const express = require('express');
//Burada expressi require ederek çağırdık
const nodemon = require('nodemon');
const app = express();
//Burada expressi ana sunucu şablonu yaptık
app.get ('/',(req,res)=>{
    res.send('index sayfası');
});
//Burada get request için sonuç gönderdik
const port = 3000;
app.listen(port,() => {
    console.log(`App started at ${port}`);}
    );
//Burada portu başltıp dinlemeye 3000 portundan başladık
