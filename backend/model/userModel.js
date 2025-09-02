const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: [true,"enter your fullName "],
        minlength:[2,"the Name shuld be atlest 3 charecter"]
    },
    email:{
        type:String,
        required: [true,"enter your email "],
        unique: [true,"email already axisted"]
    },
    password:{
        type:String,
        required: [true,"enter your password "],
    },
    userPhoto:{
        type:String,
        
    },
    gender:{
        type:String,
        required: [true,"choose your gender "],
    },
    age:{
        type:String,
        required: [true,"enter your age "],
    },
     role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    status:{
        type:Boolean,
        default:true,
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;