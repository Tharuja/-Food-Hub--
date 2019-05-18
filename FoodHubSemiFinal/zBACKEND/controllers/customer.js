const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

const User = require('../models/customer');
const Invoice =require('../models/invoicedb');
const Deliverer=require('../models/deliverers');
//get a list from db
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


module.exports.editall=(req,res,next)=>{ 
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
      User.findOne({_id:req.params.id}).then(function(details){
        res.send(details);
        console.log(details);
    });
    
}).catch(next);
}



module.exports.changepwall=(req,res,next)=>{ 
User.find({_id:req.params.id}).then(function(details){
    if(details.length>0){
                                            
        bcrypt.compare(req.body.currerntpassword,details[0].password,(err,result)=>{    
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:err
                });
                
            }
            else if(result)
            {
                bcrypt.hash(req.body.newpassword,10,(err,hash)=>{
                    if(err){
                        return res.status(300).json({
                            error:err
                        });
                    }
                    else{ 
    
                  User.findOneAndUpdate({_id:req.params.id}, {$set:{ password:hash}}, {new: true}, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    else{
                        return res.status(200).json({
                            msg:"updated"
                        });
                        console.log(doc);
                    }
                  
                });
            }
        });
            }
            else
            {
                return res.status(400).json({
                    error:err
                });
            }
        });
                 
    }

});
}





module.exports.viewprofile=(req,res,next)=>{ 
User.findById({_id:req.params.id},req.body).then(function(details){
    res.send(details);
    console.log(details);

}).catch(next);
}



