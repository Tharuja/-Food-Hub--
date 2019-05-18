const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ordereditems = new schema({
 
    invoiceID:{
        type:String,
        required:true
    },
    itemid:{
        type:String,
        default:"No shop name"
        
    },
    itemname:{
        type:String
    },
    unitprice:{
        type:Number
    },

    orderedamount:{
        type:Number
        
        
    },
    subprice:{
        type:Number     
    }
    
   
     
});

const OrderedItems = mongoose.model('ordereditems',ordereditems);
module.exports=OrderedItems;