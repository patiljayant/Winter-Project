const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      crypto = require('crypto'),
      nodeMailer = require('nodemailer'),
      User = require('../../dbConfig/models/user.js'),
      Products = require('../../dbConfig/models/products.js'),
      TempUser = require('../../dbConfig/models/tempUser.js')
      multer = require('multer'),
      path = require('path'),
      razorpay = require('razorpay'),
      request = require('request'),
      keys = require('../../dbConfig/keys/keys.js');
      
const razorInstance = new razorpay({
    key_id : keys.razorpayIdKey ,
    key_secret : keys.razorpaySecretKey
})


var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iiit.com.help@gmail.com',
      pass: 'iiit.com'
    }
  });


var storage = multer.diskStorage({
                                destination:"./client/public/images/",
                                filename:function(req,file,cb){
                                    cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
                                }
                            });	
var upload=multer({
                    storage:storage,
                    fileFilter:function(req,file,cb){
                        checkfiletype(file,cb);
                    }
                }).array('files', 5);
    
function checkfiletype(file,cb){
        var filetypes=/jpeg|jpg|png|jfif/;
        //check exit
        var extname= filetypes.test(path.extname(file.originalname).toLowerCase());
        var mimetype= filetypes.test(file.mimetype);
        
        if(mimetype &&  extname)
            return(cb(null,true));
        
        else
            cb("Error: images only");
    }

router.get('/',(req,res) => {

    const id = req.user._id;
    User.findOne({_id:id}, (err,foundUser) => {
		if(err)
			console.log("notfound")
		
		else{
			var user = { details : foundUser,
                isLoggedIn : req.isAuthenticated()
                }
                console.log('success')
                res.send(user);
		}
    })    
}); 

router.get('/chkLogin',(req,res) => {
    
    console.log('success chklogin')
    res.send({loginStatus : req.isAuthenticated()});
});

router.get('/getInitialState', (req, res) => {
    Products.find({}, function(err,foundProducts){
        if(err){
            console.log(err);
        }
        else{
            initialState = {
                products : foundProducts,
                details : req.user,
                isLoggedIn : req.isAuthenticated()
            }

            res.send(initialState);
        }
    });
})

router.get('/isLoggedIn', (req, res) => {
    if(!req.isAuthenticated()){
        const user = { details : req.user,
            isLoggedIn : req.isAuthenticated()
            }
        res.send(user);
    }
    else{
        const id = req.user._id;
    User.findOne({_id:id}, (err,foundUser) => {
		if(err)
			console.log("notfound")
		
		else{
			var user = { details : foundUser,
                isLoggedIn : req.isAuthenticated()
                }
                console.log('success')
                res.send(user);
		}
    }) 
    }
});

router.get('/logout',(req,res) => {
    req.logout();
    console.log(req.isAuthenticated())
    res.send({isLoggedIn : req.isAuthenticated(), user : {}});
});

router.post('/login',passport.authenticate("local",{
    	successRedirect:"/api/apiRoutes/",
    	failureRedirect:"/api/apiRoutes/chkLogin"
    }),function(req,res){
});


router.post('/register', (req,res) => {
    var tempUser={
		username:req.body.username,
        firstName:req.body.first_name,
		lastName:req.body.last_name,        
        phone_number:req.body.phone_number,
        password : req.body.password
    };
    TempUser.create(tempUser, (err, newTempUser) => {
        if(err){
            console.log(err);
        }
        else{
            var mailOptions = {
                from: 'iiit.com.help@gmail.com',
                to: newTempUser.username,
                subject: 'Email Verification',
                text: 'http://localhost:3000/'+ newTempUser._id +'/verify'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.send('Confirmation Email has been sent to the registered Email-Id. Please confirm it to LogIn')
                }
              });
        }
    })
})


router.post('/verifyEmail', (req, res) => {
    const id = req.body.uId;
    console.log(id);
    TempUser.findOne({_id : id}, (err, tempUser) => {
        if(err)
            console.log(err)

        else{
            TempUser.findByIdAndDelete(id, (err, doc) =>{
                if(err)
                    console.log(err)

                else
                    console.log('deleted')    
            });
            const newUser = {
                username:tempUser.username,
                firstName:tempUser.firstName,
		        lastName:tempUser.lastName,        
                phone_number:tempUser.phone_number,
            }

            User.register(newUser, tempUser.password, (err, user) => {
                if(err)
                {
                    console.log(err);
                    console.log(err.name);
                }
                else{	
                    passport.authenticate("local")(req,res,function(){
                        console.log('register success');
                        var user = { details : req.user,
                            isLoggedIn : req.isAuthenticated()
                           } 
                        res.send(user);                 
                    });
                }
            });
        }    
            
    })
})


router.post('/register',(req,res) => {
    
    
});

router.post('/addProduct', upload, (req, res) => {
    var altImgUrl = [];
    for(var i=1; i< req.files.length;i++){
        altImgUrl.push({imgUrl : '/images/'+req.files[i].filename})
    }
    var product = {
        name : req.body.name,
        imgUrl : '/images/'+ req.files[0].filename,
        price : req.body.price,
        discount : req.body.discount,
        inStock : req.body.inStock,
        emiAvailable : req.body.emiAvailable,
        altImgUrl,
        info : req.body.info,
        inCart : false,
        numberOfItems : 0,
        rating : [],
        reviews : []
    }
    Products.create(product, (err,newProduct) => {
        if(err)
            console.log(err);

        else{
            res.send(newProduct)							
        }    
    })
})

router.post('/addToCart', (req,res) => {
    User.findOne({_id : req.user._id}, (err, user) => {
        if(err)
            console.log(err);

        else{
            user.productsInCart.push(req.body);
            user.save((err, user) => {
                if(err)
                    console.log(err);

                else{
                    res.send(user)
                }    
            })
        }    
    })
})

router.post('/substractNumberOfItems', (req, res) => {

    User.findOne({_id : req.user._id}, (err, user) => {
        if(err)
            console.log(err);

        else{
            
            user.productsInCart = user.productsInCart.map(productInCart => {
                                        if(productInCart._id == req.body.id){
                                            productInCart.numberOfItems = productInCart.numberOfItems - 1;
                                        }
                        
                                        if(productInCart.numberOfItems > 0)
                                            return productInCart
                                    })
            user.productsInCart = user.productsInCart.filter(m => m!==undefined)
            user.save((err, user) => {
                if(err)
                    console.log(err);

                else{
                    res.send(user)
                }    
            })
        }    
    })
})

router.post('/addNumberOfItems', (req, res) => {

    User.findOne({_id : req.user._id}, (err, user) => {
        if(err)
            console.log(err);

        else{
            
            user.productsInCart = user.productsInCart.map(productInCart => {
                                        if(productInCart._id == req.body.id){
                                            productInCart.numberOfItems = productInCart.numberOfItems + 1;
                                        }
                                            return productInCart
                                    })
            user.save((err, user) => {
                if(err)
                    console.log(err);

                else{
                    res.send(user)
                }    
            })
        }    
    })
})


router.post('/removeCartProduct', (req, res) => {

    User.findOne({_id : req.user._id}, (err, user) => {
        if(err)
            console.log(err);

        else{
            user.productsInCart = user.productsInCart.filter(m => m._id != req.body.id)
            user.save((err, user) => {
                if(err)
                    console.log(err);

                else{
                    res.send(user)
                }    
            })
        }    
    })
})

router.post('/addAddress', (req, res) => {
    User.findOne({_id : req.user._id}, (err, user) => {
        if(err)
            console.log(err);

        else{
            user.addresses.push(req.body);
            user.save((err, user) => {
                if(err){
                    console.log(err)
                }
                else{
                    const data = {
                        details: user,
                        isLoggedIn : req.isAuthenticated()
                    }
                    res.send(data);
                }
            })
        }    
    })
})



router.post("/orders", async (req, res) => {
    try {
        const options = {
            amount: 100 * req.body.totalCharge, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
            payment_capture: 0
        };

        const order = await razorInstance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // const digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, keys.razorpaySecretKey);
        const shasum = crypto.createHmac("sha256", keys.razorpaySecretKey);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "Payment Successful",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/orderConfirmed', (req, res) => {
    if(req.body.pId === 'cart'){
        User.findById(req.user._id, (err, user) => {
            if(err)
                console.log(err)

            else{
                const add = user.addresses.filter(a => a._id === req.body.addressId);
                const order = {
                    products : user.productsInCart,
                    sAddress : add[0],
                    tentArrive : Date.now(),
		            paymentId : req.body.paymentId,
		            orderId : req.body.orderId
                }
                user.orders = [...user.orders, order]
                user.productsInCart = [];
                user.save((err, user) => {
                    if(err)
                        console.log(err);

                    else{
                        const data = {
                            details: user,
                            isLoggedIn : req.isAuthenticated()
                        }
                        res.send(data);
                    }    
                });
            }    
        })
    }
    else{
        User.findById(req.user._id, (err, user) => {
            if(err)
                console.log(err)

            else{
                const add = user.addresses.filter(a => a._id === req.body.addressId);
                const prod = user.productsInCart.filter(a => a._id == req.body.pId);
                const order = {
                    products : prod[0],
                    sAddress : add[0],
                    tentArrive : Date.now(),
		            paymentId : req.body.paymentId,
		            orderId : req.body.orderId
                }
                user.orders = [...user.orders, order]
                user.productsInCart = [];
                user.save((err, user) => {
                    if(err)
                        console.log(err);

                    else{
                        const data = {
                            details: user,
                            isLoggedIn : req.isAuthenticated()
                        }
                        res.send(data);
                    }    
                });
            }    
        })
    }
})


module.exports = router;
