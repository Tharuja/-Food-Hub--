const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
     
    shop_id: {
        type: String,
        unique: true,
        required: true,
    },

    email:{
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
    shop_owner_name:{
        type:String,
        required:true
    },
    shop_name:{
        type:String,
        default:"No shop name"
        
    },
    description:{
        type:String,
        default:"No description"
        
    },
    address:{
        type:String,
        required:true
    },

    town:{
      type:String,
      default:"No city" 
    },
    
    contact_no:{
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

        rating: {
        type: String,
    
    },

    imagepath: {
        type: String,
    
    },
    lat: {
        type: Number,
    
    },

    lng: {
        type: Number,
    
    },
    shopstatus: {
        type: String,
        default:"Active"
    
    }





    
     
});

const Detailsitem = mongoose.model('shops',Details);//'details' is mongodb name Details is the schema name;register is collection name;
module.exports=Detailsitem;