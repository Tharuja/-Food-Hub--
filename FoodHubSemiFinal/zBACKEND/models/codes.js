const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
   
    vcode: {
        type: String,
    

    },
    email:{
        type:String,
    
        required:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    type:{
        type:String,
        required:true,
    },

  


});

const Detailsitem = mongoose.model('codes', Details); 
module.exports = Detailsitem;