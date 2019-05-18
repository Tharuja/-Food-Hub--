const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Details = require('../models/user');
const User = require('../models/secuser');
const Invoice =require('../models/invoicedb');
const Customer = require('../models/fooduser');
const Deliverer=require('../models/deliverer');
//get a list from db
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

var rnd = Math.floor(Math.random()*(1000000-100000+1)+100000)


router.post('/getuser',function(req,res){
  
    User.find({  $or:[{email:req.body.email} , {altemail:req.body.email}] })
    
    
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
    
});
//add anew data to db
router.post('/abc',function(req,res,next){
   // var rnd = Math.floor(Math.random()*(1000000-100000+1)+100000)
    User.find({  $or:[{email:req.body.email} , {altemail:req.body.altemail}] }).then(function(details){
    if(details.length>0){
        return res.status(400).json({
            message:"email exist"
        });
        
    }

    else{
      
        if(req.body.code!=rnd)
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
                   
                    email:req.body.email,
                    altemail:req.body.altemail,
                    password:hash,
                    username:req.body.name,
                    address:req.body.address,
                    mobile:req.body.mobile,
                    type:req.body.type,
                    code:req.body.code 
                   
                   
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
 
   
   
   
}); 

//verifyemail

router.post('/verifyemail',function(req,res,next){
    User.find({  $or:[{email:req.body.email} , {altemail:req.body.altemail}] }).then(function(details){
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

      return res.status(200).json({
        msg:"email sent"
    });

    }
});
});


//update data in db
router.put('/edit/:id',function(req,res,next){
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        User.findOne({_id:req.params.id}).then(function(details){
            res.send(details);
            console.log(details);
        });
        
    }).catch(next);

});

//forget password
router.post('/forgetpw',function(req,res,next){
    var rnd2 = Math.floor(Math.random()*(1000000-100000+1)+100000)

    User.find({  $or:[{email:req.body.email} , {altemail:req.body.email}] }).then(function(details){
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
                subject: 'Verify your email to sign up with Food Hub',
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

              User.findOneAndUpdate({email:req.body.email}, {$set:{ password:hash}}, {new: true}, (err, doc) => {
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
});
//forget pw check code
router.post('/forgetpw2',function(req,res,next){
    if(req.body.code!=rnd)
                {            

                    return  res.status(400).json({success:false});

            
        }
        else {
            User.find({  $or:[{email:req.body.email} , {altemail:req.body.email}] })
    
    
            .then(function(details){
            jwt.sign({details},'secretkey',{ expiresIn: '30s' }, (err,token)=>{
                //res.json({ 
                  //  token
                //})
                if(token){
                   return res.status(200).json({Token : token,success:true});
                }else{
                  return  res.status(200).json({success:false});
                }
            }); 
   
        });

    }

});

//change password
router.put('/changepassword/:id',function(req,res,next){
       
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
});

//geeting data
router.get('/view/:id',function(req,res,next){
    User.findById({_id:req.params.id},req.body).then(function(details){
            res.send(details);
            console.log(details);
        
    }).catch(next);
    
});
 //show invoice
 router.get('/showinvoice',function(req,res,next){
     
    Invoice.find({}).then(function(details){
            res.send(details);
            console.log(details);
        
    }).catch(next);
    
});

//jwt verify
router.post('/api/jwtverify', verifyToken ,(req,res)=>{

    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        console.log("vrty")
        if(err){
            //  res.sendStatus(403);
            console.log('error');
         
        } else{
            res.json({
                message:'Post created!',
                authData
            });
        }

    });

    
});

function verifyToken (req,res,next ){
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else{
         res.sendStatus(403);
       // console.log('error in verify token');
    }

}

//register delivere
router.post('/del',function(req,res,next){
    // var rnd = Math.floor(Math.random()*(1000000-100000+1)+100000)
     Deliverer.find({email:req.body.email }).then(function(details){
     if(details.length>0){
         return res.status(400).json({
             message:"email exist"
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
            

                 var det = new Deliverer({
                    
                     email:req.body.email,
                     password:hash,
                     username:req.body.name,
                     address:req.body.address,
                     mobile:req.body.mobile,
                    
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
                });
            }  
                
            
     
     });
  
    
    
    
 }); 
 
//show delivereres

router.get('/showdel',function(req,res,next){
     
    Deliverer.find({}).then(function(details){
            res.send(details);
            console.log(details);
        
    }).catch(next);
    
});

//edit deliveres

router.put('/editdel/:id',function(req,res,next){
    Deliverer.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Deliverer.findOne({_id:req.params.id}).then(function(details){
            res.send(details);
            console.log(details);
        });
        
    }).catch(next);

});
//view one delivered
router.get('/delview/:id',function(req,res,next){
    Deliverer.findById({_id:req.params.id},req.body).then(function(details){
            res.send(details);
            console.log(details);
        
    }).catch(next);
    
});

//deleta data from db
router.delete('/dew/:id',function(req,res,next){
    Details.findByIdAndRemove({_id:req.params.id}).then(function(details){
        res.send(details);
    });
    
});

/*
router.post('/edit',function(req,res,next){
    User.find({email:req.body.email}).then(function(details){
    
        var det = new User({
                   
           
            city:req.body.city
           
           
              });
        det.save((err,doc)=>{
            if(!err){
                res.status(200).send(doc);
                console.log("city added ")
                console.log(doc);
            }
            else{
                console.log('Error in adding cities:'+ JSON.stringify(err,undefined,2));
                return res.status(500).json({
                    error:err
                });
            }
            });
        
    
});

}); */
 
module.exports=router;