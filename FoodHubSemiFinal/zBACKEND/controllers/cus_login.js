const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

const User = require('../models/customer');
const Invoice =require('../models/invoicedb');
const Deliverer=require('../models/deliverers');
const Codes=require('../models/codes');

//get a list from db
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');





module.exports.login=(req,res,next)=>{ 
    User.find({ customeremail:req.body.email })
    .then(function(details){
        
        if(details.length<1){
            res.status(400).send(details)
            console.log("no such email")

        }else{
        bcrypt.compare(req.body.password,details[0].password,(err,result)=>{    
            if(err){
                console.log(err)
            }
           
       else if(result){
          //res.status(200).send(details);

          //jwt
          
        jwt.sign({details},'secretkey',{ expiresIn: '30s' }, (err,token)=>{
            //res.json({ 
              //  token
            //})
            if(token){
               return res.status(200).json({Token : token,success:true});
            }else{
              return  res.status(200).json({success:false});
            }
            console.log(token ,details)
        });    
          console.log("pass")
                }
            else{
              res.status(400).send(details);
                console.log("faile")
            }     
    });
}
});

}







module.exports.signup=(req,res,next)=>{ 
   // var rnd = Math.floor(Math.random()*(1000000-100000+1)+100000)
   User.find({customeremail:req.body.email }).then(function(details){
    if(details.length>0){
        return res.status(400).json({
            message:"email exist"
        });
        
    }

    else{
      
    //getting code from db
    Codes.find({ $and: [ {email:req.body.email }, {type:"customer"}]  }).then(function(codedetails){
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
           
                var det = new User({
                   
                    customeremail:req.body.email,
                
                    password:hash,
                    customername:req.body.name,
                    address:req.body.address,
                    mobileno:req.body.mobile,
                    type:"customer"
            
                   
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
                }
                
                    /*Details.create(req.body).then(function(details){
                    res.send(details);
                }).catch(next);
                */
                });

    }
}
       });
    }
    });
 
}





module.exports.verifyemail=(req,res,next)=>{ 
    var rnd = Math.floor(Math.random()*(1000000-100000+1)+100000)

User.find({customeremail:req.body.email}).then(function(details){
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

 //store the code
 Codes.find({ $and: [ {email:req.body.email }, {type:"customer"}]  }).then(function(codedetails){

    if(codedetails.length>0){
      
    Codes.findOneAndUpdate({  $and: [ {email:req.body.email }, {type:"customer"}]   },{vcode:rnd}).then(function(){
         
                        
        
    }).catch(next);
    }
    else{
  
  var det = new Codes({
                   
    email:req.body.email,
    vcode:rnd,
    type:"customer"

   
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










module.exports.forgetpw=(req,res,next)=>{ 
var rnd2 = Math.floor(Math.random()*(1000000-100000+1)+100000)
User.find({customeremail:req.body.email}).then(function(details){
    if(details.length>0){
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
            subject: 'Cant remember password to Food Hub',
            text: 'Here is your new password for Food-Hub - ' + rnd2  
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent:'+ rnd2 + info.response);
            }
          });

          bcrypt.hash(rnd2.toString(),10,(err,hash)=>{
            if(err){
                return res.status(300).json({
                    error:err
                });
            }
            else{ 

          User.findOneAndUpdate({customeremail:req.body.email}, {$set:{ password:hash}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        });
    }
});


          return res.status(200).json({
            msg:"email sent"
        });
        
    }
    else {

        return res.status(400).json({
            message:"No email"
        });

}
});
}