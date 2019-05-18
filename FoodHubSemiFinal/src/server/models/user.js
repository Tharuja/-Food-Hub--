const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
 
    email:{
        type:String
    },
    password:{
        type:String
       
    }
    
     
});

const Detailsitem = mongoose.model('users',Details);//'details' is mongodb name Details is the schema name;
module.exports=Detailsitem;