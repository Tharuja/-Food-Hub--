const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


const Details = new schema({
 
    email:{
        type:String
    },
    password:{
        type:String
       
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
    mobile:{
        type:String
    },
    type:{
        type:String
    }

    
     
});




const Detailsitem = mongoose.model('registers',Details);//'details' is mongodb name Details is the schema name;register is collection name;
module.exports=Detailsitem;