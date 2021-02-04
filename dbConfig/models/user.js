const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	firstName:String,
	lastName:String,
	phone_number:{ type:Number,
	          require:true,
	          unique:true },
	username:{ type:String,
	           require:true,
	           unique:true },
    productsInCart : [{
		name : String,
		imgUrl: String,
		altImgUrl : [{
			imgUrl : String
		}],
		price : Number,
		discount : Number,
		rating : [Number],
		reviews : [String],
		emiAvailable : Boolean,
		inStock : Boolean,
		numberOfItems : Number,
		info: String
	}],
	addresses : [{
		address : String,
        address2 : String,
        city : String,
        state : String,
        zip : Number
	}],

	orders : [{
		products : [{
			name : String,
		    imgUrl: String,
		    altImgUrl : [{
		    	imgUrl : String
		    }],
		    price : Number,
		    discount : Number,
		    rating : [Number],
		    reviews : [String],
		    emiAvailable : Boolean,
		    inStock : Boolean,
		    numberOfItems : Number,
		    info: String
	    }],
		sAddress : {
			address : String,
            address2 : String,
            city : String,
            state : String,
            zip : Number
		},
		tentArrive : Date,
		paymentId : String,
		orderId : String,
		shipped : {
			type : Boolean,
			default : false
		}
	}]
});    

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);