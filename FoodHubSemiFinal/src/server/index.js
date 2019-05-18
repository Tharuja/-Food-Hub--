const express= require('express');
const routes= require('./routes/api'); 
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');


const app= express();

mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({origin : 'http://localhost:8085' }));


//initialize routes
app.use('/reg',routes);

// app.use(bodyparser.jason());


app.listen(process.env.port||5000,function(){
    console.log('now listening fro request');
});