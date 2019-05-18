const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

const User = require('../models/secuser');
const InvoiceItems =require('../models/invoicedb');
const Deliverer=require('../models/deliverers');
const Codes=require('../models/codes');

//get a list from db
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


//register delivere
module.exports.registerDeliverer=(req,res,next)=>{ 

     Deliverer.find({email:req.body.email }).then(function(details){
     if(details.length>0){
         return res.status(400).json({
             message:"email exist"
         });
         
     }
 
     else{
    
        //getting code from db
      Codes.find({ $and: [ {email:req.body.email }, {type:"driver"}]  }).then(function(codedetails){
        if(codedetails.length<1){
          console.log("no such code");
            
        }
    
       else{  
        if(req.body.code!=codedetails[0].vcode)
            {
                console.log("wrong code")
                return res.status(500).json({
                 message:"check email"
                });
            }
            else{

        bcrypt.hash(req.body.pass,10,(err,hash)=>{
            if(err){
                return res.status(300).json({
                    error:err
                });
            }
            else{  
            
                Deliverer.findOne().sort({_id: -1}).then(function(details){
                    var iid = details.driverID;
            var integer = parseInt(iid.split("D")[1]);   
            iid = 'D' + (++integer).toString();
              
                 var det = new Deliverer({
                    
                    driverID:iid,
                     email:req.body.email,
                     password:hash,
                     driverName:req.body.name,
                     address:req.body.address,
                     mobile:req.body.mobile,
                     shopid:req.body.shopid
                    
                       });
                 det.save((err,doc)=>{
                     if(!err){
                         res.status(200).send(doc);
                         console.log("signed")
                         console.log(doc);
                     }
                     else{
                         console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
                         return res.status(500).json({
                             error:err
                         });
                     }
                     });
                  
                    })
        
                 }
                 
                });
            }  
        }
                
    });
}     
     
     });
  
    
    }
 
//show  all delivereres
module.exports.showDeliverers=(req,res,next)=>{    
    Deliverer.find({shopid:req.params.id},req.body).then(function(details){
            res.send(details);
            console.log(details);
        
    }).catch(next);
    
}

//edit deliveres
module.exports.editDel=(req,res,next)=>{ 
  
        console.log(req.body)
        Deliverer.findOneAndUpdate({driverID:req.params.id},req.body).then(function(){
            Deliverer.findOne({driverID:req.params.id}).then(function(details){
                res.send(details);
                console.log(details);
            });
            
        
    }).catch(next);
}



//view one delivered
module.exports.viewDel=(req,res,next)=>{ 
    Deliverer.find({driverID:req.params.id},req.body).then(function(details){
            res.send(details);
            console.log(details);
        
    }).catch(next);
}


  
//verifyemail
module.exports.verifyemail=(req,res,next)=>{ 
    var rnd = Math.floor(Math.random()*(1000000-100000+1)+100000)

    Deliverer.find({email:req.body.email}).then(function(details){
        if(details.length>0){
            return res.status(400).json({
                message:"email exist"
            });
            
        }
        else {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'foodhub.srilanka@gmail.com',
          pass: 'foodhub123'
        }
      });
      
      var mailOptions = {
        from: 'foodhub.srilanka@gmail.com',
        to: req.body.email,
        subject: 'Verify your email to sign up with Food Hub',
        text: 'Here is your verification code-' + rnd
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: '+ rnd + info.response);
        }
      });
      
      Codes.find({ $and: [ {email:req.body.email }, {type:"driver"}]  }).then(function(codedetails){

        if(codedetails.length>0){
          
        Codes.findOneAndUpdate({  $and: [ {email:req.body.email }, {type:"driver"}]   },{vcode:rnd}).then(function(){
             
                            
            
        }).catch(next);
        }
        else{
      
      var det = new Codes({
                       
        email:req.body.email,
        vcode:rnd,
        type:"driver"
    
       
          });
    det.save((err,doc)=>{
        if(!err){
            
            console.log("code saved")
        
        }
        else{
            console.log('Error in saving code:');
          
        }
        });
    
    
    
      }
        });
    
        
      return res.status(200).json({
        msg:"email sent"
    });
    
    }
    });
    }
    
    //delete 
    module.exports.deletedriver=(req,res,next)=>{
   
        Deliverer.deleteOne({ _id:req.body._id },(err, items) => {
            console.log(items);
          if (err) return res.json({ success: false, error: err });
          return res.json(items);
        });
    
    } 
    
//chiranga

module.exports.retrieveDeliverer=(req,res,next)=>{
    Deliverer.find({shopid:req.params.id}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
}

module.exports.assignDeliverer=(req,res,next)=>{
    console.log(req.body)
    InvoiceItems.findOneAndUpdate({invoiceID:req.params.id},req.body).then(function(){
        InvoiceItems.findOne({invoiceID:req.params.id}).then(function(details){
            res.send(details);
        });
        
    }); 
}