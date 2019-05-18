const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
   
    customername: {
        type: String,
        required: true,

    },

    customeremail:{
        type:String,
        unique:true,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
       
        
    },
    mobileno:{
        type:String,
        match: /^\d{10}$/,
        required:true,
        minlength:10,
        maxlength:10,
        
    },
    type:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,       
        minlength:5,

    }




});

const Detailsitem = mongoose.model('customers', Details); 
module.exports = Detailsitem;