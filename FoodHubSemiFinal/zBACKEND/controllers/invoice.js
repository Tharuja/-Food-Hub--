const express= require('express');
const router = express.Router();

const InvoiceItems = require('../models/invoicedb');
const OrderedItems = require('../models/ordereditems');
const Shop = require('../models/secuser');



module.exports.allInvoices=(req,res,next)=>{
    InvoiceItems.find({shopid:req.params.id}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
}

module.exports.orderedItems=(req,res,next)=> {
    OrderedItems.find({invoiceID:req.params.id}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
}

module.exports.deleteInvoice=(req,res,next)=> {
   
    InvoiceItems.deleteOne(req.body,(err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });

}

module.exports.findByDate=(req,res,next)=> {
    console.log(req.body.date);
  InvoiceItems.find({date: {$regex : ".*"+req.body.date}, shopid:req.body.shopid }, (err, items) => {
      console.log(items);
    if (err) return res.json({ success: false, error: err });
    return res.json(items);
  });
}


module.exports.getMyCount=(req,res,next)=> {

    try {
        console.log(req.params.id);
        var shoprating=3;
        Shop.findOne({shop_id:req.params.id}, ( err , result) => {
            if(err) {
                return;
            } 
            console.log(result.rating);
            shoprating=result.rating;
            console.log(shoprating)
           
        })
    
    
        InvoiceItems.count({shopid:req.params.id} ,function (err, result) {
              if (err) {
                  console.log(err);
                  return;
              }
    
              var invoicecount=result;
              var cusrating=parseInt(req.params.crating) ;
              
    
              var final = ((shoprating*invoicecount)+cusrating)/(invoicecount+1)
            //   var finalshoprating=Math.round(final);
    
              const document={
                  rating:final
              }
    
            Shop.findOneAndUpdate({shop_id:req.params.id},document).then(function(){
                Shop.findOne({shop_id:req.params.id}).then(function(details){
                    
                        return res.status(400).json({
                            message:details
                        });
                        
                   
                })
                
            });
              
            
      
      });
    } catch (error) {
        return res.status(404).json({
            message:error
        });
    }
   
}
  



