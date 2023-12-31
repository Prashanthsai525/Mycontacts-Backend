const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type: String,
        required: [true, "Please add the user name"]
    },
    email:{
        type: String,
        required: [true, "Please add the email id"],
        unique: [true,"This Email is already registered"]
    },
    password:{
        type:String,
        required: [true, "Please Enter the user password"]
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("User",userSchema);