
const express= require('express');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
//models
const User = require('../models/secuser');

const Deliverer=require('../models/deliverers');
//get a list from db
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
//controllerrs
const login = require('../controllers/login');
const shop = require('../controllers/shop');
const deliv = require('../controllers/deliv');
const cus_login =require('../controllers/cus_login');
const customer =require('../controllers/customer');
const Invoice=require('../controllers/invoice')
const fooditems=require('../controllers/fooditems')

//llogin
router.post('/getuser',login.login);
router.post('/abc',login.signup);
router.post('/verifyemail',login.verifyemail);
router.post('/forgetpw',login.forgetpw);

router.post('/login',cus_login.login);
router.post('/signup',cus_login.signup);
router.post('/cus_verifyemail',cus_login.verifyemail);
router.post('/cus_forgetpw',cus_login.forgetpw);



//edit

router.put('/edit/:id',shop.editall);
router.put('/changepassword/:id',shop.changepwall);
router.get('/view/:id',shop.viewprofile);
router.post('/contactus_shop',shop.contactus_shop); //contact us
router.put('/deactivateacc',shop.deactivate); //deactivate
router.put('/wakeupacc',shop.activate); //activate



//Thisuru
router.get('/viewitems/:id',shop.viewitems);


router.put('/cus_edit/:id',customer.editall);
router.put('/cus_changepassword/:id',customer.changepwall);
router.get('/cus_view/:id',customer.viewprofile);


//deliverer

router.post('/del',deliv.registerDeliverer)
router.get('/showdel/:id',deliv.showDeliverers);
router.put('/editdel/:id',deliv.editDel)
router.get('/delview/:id',deliv.viewDel);
router.post('/del_verifyemail',deliv.verifyemail);
router.post('/driver_delete',deliv.deletedriver);


//deliver chiranga
router.get('/retdel/:id',deliv.retrieveDeliverer);
router.post('/assignD/:id',deliv.assignDeliverer);

//invoice
router.get('/retrieveallinvoices/:id',Invoice.allInvoices);
router.get('/retrieveordereditems/:id',Invoice.orderedItems);
router.post('/deletefromInvoice',Invoice.deleteInvoice);
router.post('/invoicesbydate',Invoice.findByDate);

//itemsadd -----

//add
router.post('/fooddet',fooditems.addfood);
router.post('/imageup/:id',fooditems.imgupld);
router.post('/newfood',fooditems.newfood);

//show
router.get('/retrieve/:id',fooditems.retrieveitems);
router.post('/deletef',fooditems.deleteItem);

//update
router.post('/retrieveone',fooditems.retOneItem);
router.post('/foodupdate/:id',fooditems.updateFood);

//get shop_name from db
router.get('/foods',shop.getShopName);

//get shops from db according to address
router.get('/shops',shop.getShopAcdintoAddress);

//testing


router.get('/getMyCount/:id/:crating',Invoice.getMyCount);


module.exports=router;