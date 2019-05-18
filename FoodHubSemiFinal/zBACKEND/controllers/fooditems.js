const express= require('express');
const router = express.Router();

const multer = require('multer');

const Items = require('../models/itemschema');



const storage = multer.diskStorage({
    destination: '../src/upload',
    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname);   
    }

});

//Init Upload

const upload = multer({
    storage:storage

}).single('file');


module.exports.addfood=(req,res,next)=>{

    var det = new Items({
        itemid: req.body.itemid,
        itemname:req.body.itemname,
        qty:req.body.qty,
        price:req.body.price,
        imagepath:"alternate.jpg"   
    })
  //  console.log(req.file);
   
    //imagepath=req.file.filename;
    det.save((err,doc)=>{
        if(!err){
            res.status(200).json({ message : "Food Item Added Successfully!"});
        }
        else{
            res.status(404).json({ message : "Could not add the food item!"})
        }
    })


};


module.exports.newfood=(req,res,next)=>{

    console.log("inside new food")
    console.log(req.body.itemname)

    Items.find({ $and: [{ shopid:req.body.shopid}, {itemname:req.body.itemname }, {description:req.body.description}]  }).then(function(codedetails){

        if(codedetails.length>0){
          
            res.status(404).json({ message : "Food Item Exists!"})
            

        }else{
           

            Items.findOne().sort({_id: -1}).then(function(details){
                var iid = details.itemid;
        var integer = parseInt(iid.split("C")[1]);   
        iid = 'C' + (++integer).toString();
        
            var det = new Items({
                itemid: iid,
                itemname:req.body.itemname,
                qty:req.body.qty,
                price:req.body.price,
                imagepath:req.body.myfile, 
                description: req.body.description,
                shopid:req.body.shopid
            })
          //  console.log(req.file);
           
            //imagepath=req.file.filename;
            det.save((err,doc)=>{
                if(!err){
                    res.status(200).json({ message : "Food Item Added Successfully!"});
                }
                else{
                    res.status(404).json({ message : "Could not add the food item!"})
                }
            })
        })
        
       
          }

        });
    
    }

module.exports.imgupld=(req,res,next)=>{
   
    let itemid=req.params.id;
    console.log("In image upload");

    Items.findOne({itemid:req.body.itemid}, (err, items) => {
        console.log(items);
      if (err) return res.json({ message:"food item does not exist!" });
      else upload(req,res,(err) => {
            if(err){
                res.json({ message : "Could not upload the image"})
            }else{  
                Items.findOneAndUpdate({itemid:itemid},{imagepath:req.file.filename},(err,items)=>{
                    if(err)res.json({message:"Image Upload failed!"})
                 
                    res.json({message:"Image successfully uploaded!"})

                })
               
            
            }
        });
    
    
     })
        
}


module.exports.retrieveitems=(req,res,next)=>{
    try {
        Items.find({shopid:req.params.id}, (err, items) => {
            //console.log(items);
          if (err) return res.status(500).json({ success: false, error: err });
          return res.json(items);
        });
    } catch (error) {
        return res.json(items);
    }
   
}

module.exports.deleteItem=(req,res,next)=>{
   
    Items.deleteOne({ itemid:req.body.itemid },(err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });

} 

module.exports.retOneItem=(req,res,next)=> {
    Items.findOne({itemid:req.body.itemid}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
}

module.exports.updateFood=(req,res,next)=>{

    

    Items.findOneAndUpdate({itemid:req.params.id},req.body).then(function(){
        Items.findOne({itemid:req.params.id}).then(function(details){
            res.send(details);
        });
        
    });

}
