const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required:[true, "Please enter your name!"],
        trim: true 
    },
    email :{
        type : String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password :{
        type : String,
        required: [true, "Please enter your password!"],
        trim: true
    },
    role : {
        type : Number,
        default: 0

    },
    avtar : {
        type: String ,
        default : "https://www.brandeps.com/icon-download/U/User-icon-vector-01.svg"
    },
    
    timestamps: true
    
}) 

module.exports = mongoose.model("Users", userSchema)