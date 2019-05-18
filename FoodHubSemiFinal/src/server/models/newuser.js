const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
 
    email:{
        type:String,
        unique:true,
        required:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
        required:true,
        match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        minlength:5
    
       
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

    city:{
      type:String,
    },
    
    mobile:{
        type:String,
        match: /^\d{10}$/,
        required:true,
        minlength:10,
        maxlength:10
        
    },
    type:{
        type:String,
        required:true,
    }

    
     
});

const Detailsitem = mongoose.model('register',Details);//'details' is mongodb name Details is the schema name;register is collection name;
module.exports=Detailsitem;