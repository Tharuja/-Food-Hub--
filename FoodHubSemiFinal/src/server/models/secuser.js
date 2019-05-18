const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
 
    email:{
        type:String,
        unique:true,
        required:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    altemail:{
        type:String,
        unique:true,
        required:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    password:{
        type:String,
        required:true,
        match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,  //nikan dala thyenne hash wena nisa krn ba
        minlength:5
    
       
    },
    username:{
        type:String,
        required:true
    },
    shopname:{
        type:String,
        default:"No shop name"
        
    },
    shopdesc:{
        type:String,
        default:"No description"
        
    },
    address:{
        type:String,
        required:true
    },

    city:{
      type:String,
      default:"No city" 
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
    },
    code:{
        type:String,
        required:true,
    
    },



    
     
});

const Detailsitem = mongoose.model('secondusers',Details);//'details' is mongodb name Details is the schema name;register is collection name;
module.exports=Detailsitem;