const mongoose = require('mongoose');
const schema = mongoose.Schema;



const Item = new schema({
   
    itemid:{
        type:String,
        unique:true
    },
    itemname:{
        type:String,
        required:true
       
    },
    qty:{
        type:Number,
        required:true
       
    },
    price:{
        type:Number,
        required:true
       
    },
    imagepath:{
        type: String,
        default:"alternate.jpg"       
    },
    description:{
        type:String
       
    },
    shopid:{
        type:String
       
    }
    
    
     
});

const Items = mongoose.model('fooditems',Item);//'details' is mongodb name Details is the schema name;
module.exports=Items;