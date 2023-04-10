const mongoose = require('mongoose');
//create Table Article
const RegisteredUserSchema = new mongoose.Schema(
    {
        userName: {
            type:String,
            required:true
        },
        pass: {
            type:String,
            required:true
        }
    }
,{timestamps:true});
const RegisteredUser = mongoose.model("RegisteredUser",RegisteredUserSchema);

module.exports = RegisteredUser;

