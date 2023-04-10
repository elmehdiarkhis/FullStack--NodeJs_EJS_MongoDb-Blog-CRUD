const mongoose = require('mongoose');
//create Table Article
const articleSchema = new mongoose.Schema(
    {
        titre: {
            type:String,
            required:true
        },
        snippet: {
            type:String,
            required:true
        },
        body: {
            type:String,
            required:true
        }, 
        tag: {
            type:String,
            required:true
        },
        createdAt: {
            type:Date,
            default: Date.now
        },
        avatar: {
            type:String,
            required:true
        }
    }
,{timestamps:true});
const Article = mongoose.model("Article",articleSchema);

module.exports = Article;