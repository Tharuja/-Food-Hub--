const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Details = new schema({
 
      invoiceID:{
        type:String,
        required:true
    },
    shopname:{
        type:String,
        default:"No shop name"
        
    },
    customeremail:{
        type:String,
        required:true
    },
    
    orderedfooditems:{
        type:String,
        
        
    },
  

    totalprice:{
      type:String,
     
    },
    
        date:{
        type:String,
        required:true,
    },
    deliverystatus:{
        type:String,
        required:true,
    
    },



    
     
});

const Detailsitem = mongoose.model('invoices',Details);//'details' is mongodb name Details is the schema name;register is collection name;
module.exports=Detailsitem;