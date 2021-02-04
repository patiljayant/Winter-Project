const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

const tempUserSchema = new mongoose.Schema({
	firstName:String,
	lastName:String,
	phone_number:{ type:Number,
	          require:true,
	          unique:true },
	username:{ type:String,
	           require:true,
	           unique:true },
    password : {
        type : String,
        require : true
    },
    createdAt: { 
        type: Date,
        expires: 3600,
        default: Date.now 
    }
});    

tempUserSchema.plugin(passportLocalMongoose);
tempUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TempUser', tempUserSchema);