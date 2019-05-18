const express= require('express');
const routes= require('./routes/api'); 
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
var multer = require( 'multer');
var upload = multer();

multer({
    limits: { fieldSize: 1024 * 1024 * 1024 }
})


const app= express();
mongoose.connect('mongodb://chirangaw186:twinturbov8@ds163354.mlab.com:63354/foodhubdb');
//mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;

    app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(upload.array());

app.use(cors({origin : 'http://localhost:8080' }));


//initialize routes
app.use('/reg',routes);

// app.use(bodyparser.jason());


app.listen(process.env.port||3000,function(){
    console.log('now listening fro request');
});

