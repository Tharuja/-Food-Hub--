const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

const User = require('../models/secuser');
const Shop = require('../models/secuser');
const Food = require('../models/itemschema');


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
    console.log("Details for tharuja")
    console.log(details.shop_id);

}).catch(next);

}

module.exports.viewitems=(req,res,next)=>{ 
   
    var shopprofile = {
        shop_id : "",
        email : "",
        shop_owner_name : "",  
        address: "",
        password : "",
        contact_no : "",
        type : "",
        town : "",
        description: "",
        imagepath: "",
        shop_name:  "",
        _id:  "",
        rating: "",
        lat: "",
        lng: ""
        
      }
    
      Shop.find({_id:req.params.id}, (err, foods) => {
        console.log(foods)
        shopprofile.shop_id = foods[0].shop_id;  
        shopprofile.address = foods[0].address;
        shopprofile.town = foods[0].town;
        shopprofile.description = foods[0].description
        shopprofile.imagepath = foods[0].imagepath
        shopprofile.shop_name = foods[0].shop_name
        shopprofile._id = foods[0]._id
        shopprofile.rating = foods[0].rating
        shopprofile.lat = foods[0].lat
        shopprofile.lng = foods[0].lng
    

        if (err) return res.json({ success: false, error: err });
       
    
        Food.find({"shopid" : foods[0].shop_id.toString()}, (err, foods) => {
          console.log("$$$$") 
          console.log(foods)  
          shopprofile.items = foods;
          if (err) return res.json({ success: false, error: err });
        //   console.log("merged result")
        //   console.log("shopprofile")
        //   console.log(shopprofile)
          return res.json({ success: true, data: shopprofile });
        });
    
      });
   
    
    
    }



//get shop_name=shop_id from db
module.exports.getShopName = (req, res) => {
    console.log(req.query.key.toString());
  
    var shopprofile = {
      shop_id : "",
      email : "",
      shop_owner_name : "",  
      address: "",
      password : "",
      contact_no : "",
      type : "",
      town : "",
      description: "",
      imagepath: "",
      shop_name:  "",
      _id:  "",
      rating: "",
      lat: "",
      lng: ""
      
    }
  
    Shop.find({"shop_id" : req.query.key.toString()}, (err, foods) => {
      
      shopprofile.shop_id = foods[0].shop_id;  
      shopprofile.address = foods[0].address;
      shopprofile.town = foods[0].town;
      shopprofile.description = foods[0].description
      shopprofile.imagepath = foods[0].imagepath
      shopprofile.shop_name = foods[0].shop_name
      shopprofile._id = foods[0]._id
      shopprofile.rating = foods[0].rating
      shopprofile.lat = foods[0].lat
      shopprofile.lng = foods[0].lng
      shopprofile.contact_no = foods[0].contact_no
  
        console.log("foods[0].town");
        console.log(foods[0].town);
      if (err) return res.json({ success: false, error: err });
     
  
      Food.find({"shopid" : req.query.key.toString()}, (err, foods) => {
        console.log("$$$$") 
        // console.log(foods)  
        shopprofile.items = foods;
        if (err) return res.json({ success: false, error: err });
        console.log("merged result")
        //console.log(foods)
        //console.log(shopprofile)
        return res.json({ success: true, data: shopprofile });
      });
  
    });
  };


//get shops from db according to address  
module.exports.getShopAcdintoAddress = (req, res) => {
    Shop.aggregate([
      {$group: {
          _id: "$town",
          shops: {$push: "$$ROOT"}
      }}
    ], (err, shops) => {
        console.log("get shops from db according to address")
        console.log(shops);

        for(var i=0; i < shops.length; i++){

            var active_shops = shops[i].shops.filter(function(shop){
              return shop.shopstatus=="Active"
              });
  
              shops[i].shops = active_shops;
  
          }
  
          console.log("inative filtered");
          console.log(shops);

        //    shops[i].shops[j].shopstatus.filter(shopstatus => shopstatus.length == active);
           


      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: shops });
    });
  };


//contact us
module.exports.contactus_shop=(req,res,next)=>{ 

    User.find({shop_id:req.body.shopid}).then(function(details){
        if(details.length>0){
           console.log(details[0].email)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'foodhub.srilanka@gmail.com',
                  pass: 'foodhub123'
                }
              });
              
              var mailOptions = {
                from: 'foodhub.srilanka@gmail.com',
                to: details[0].email,
                subject: 'Food Hub Customer Messages ',
                text: "From " + req.body.msgemail +"("+req.body.msgname + ") regarding :- " +req.body.msgsubject+ ".  " + req.body.msgmsg
                   
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
        else
        {
            console.log("Cant contact")
        }
    
    })
    
    }

    module.exports.deactivate=(req,res,next)=>{ 
        User.findOneAndUpdate({_id:req.body._id  },{shopstatus:"Deactive"}).then(function(){

            User.findOne({_id:req.body._id }).then(function(details){
                return res.status(200).json({
                    msg:"deactivated"
                });
            });
            
        
    }).catch(next);
}


module.exports.activate=(req,res,next)=>{ 
    User.findOneAndUpdate({_id:req.body._id  },{shopstatus:"Active"}).then(function(){

        User.findOne({_id:req.body._id }).then(function(details){
            return res.status(200).json({
                msg:"activated"
            });
        });
        
    
}).catch(next);
}
