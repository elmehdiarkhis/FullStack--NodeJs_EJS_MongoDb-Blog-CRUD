const mongoose = require('mongoose');
//create Table Article
const emailSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            required:true
        },
    }
,{timestamps:true});
const Email = mongoose.model("Email",emailSchema);

module.exports = Email;