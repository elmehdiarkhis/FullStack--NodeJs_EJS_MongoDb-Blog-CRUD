//express==========================================
const express=require('express');
const app = express();
//ejs
app.set('view engine','ejs');
//css
app.use(express.static('public'));

//mongoose===========================
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://system:system@cluster0.8xzdlmn.mongodb.net/?retryWrites=true&w=majority")
.then(resultat=>{
    console.log("mongosse Connected !!")
    app.listen(2003, ()=>{
        console.log("server listening at PORT : 2003 !!")
    })
})
.catch(error=>{
    console.log(error)
})



//Routes=========================================

//modules-------------
const Article = require('./models/Article');
const Email = require('./models/Email');
const RegisteredUser = require('./models/RegisteredUser');
//-------------

//image
const upload = require('express-fileupload');
const { redirect } = require('statuses');
app.use(upload())



//Firs index
app.get('/',(req,res)=>{
    Article.find().sort({createdAt:-1})
    .then(result=>{
        //ici
        res.render('indexBlog',{articles:result})
    })
    .catch(error=>{
        console.log(error)
    })
})

//SignUp
app.get("/signUp",(req,res)=>{
    res.render("signUp")
})

app.post('/signUp',(req,res)=>{
    const newRegisteredUser = new RegisteredUser(req.body).save()
    .then(result=>{
        Article.find().sort({createdAt:-1})
        .then(result=>{
            res.render('index',{articles:result})
        })
        .catch(error=>{
            console.log(error)
        })
    })
    .catch(error=>{
        console.log(error)
    }) 
})



//Login
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post('/login',(req,res)=>{

    RegisteredUser.findOne(req.body,(err,user)=>{

        if(err){
            console.log(err)
            return res.redirect("/login");
        }

        if(!user){
            return res.redirect("/login");
        }

        Article.find().sort({createdAt:-1})
        .then(result=>{
            //ici
            res.render('index',{articles:result})
        })
        .catch(error=>{
            console.log(error)
        })

    })
})

//Disconnect
app.get('/Disconnect',(req,res)=>{
    Article.find().sort({createdAt:-1})
    .then(result=>{
        //ici
        res.render('indexBlog',{articles:result})
    })
    .catch(error=>{
        console.log(error)
    })
})



//POST------------------------------
app.get('/create',(req,res)=>{
    res.render("create")
})


app.post('/create', (req, res) => {
    if(req.files){
        //upload images
        var file = req.files.avatar
        var filename = req.files.avatar.name
        file.mv('./public/images/'+filename,function(err){
            if(err){
                console.log(err)
            }else{
                console.log("File Uploaded")
            }
        })

        
        let newArticle = new Article(
            {
                titre: req.body.titre,
                snippet: req.body.snippet,
                body: req.body.body,
                tag:req.body.tag,
                avatar: filename
            }).save()
            .then(resultat=>{
                res.redirect('/');
            })
            .catch(error=>{
                console.log(error)
            })
    }else{
        console.log("req.files erreur")
    } 
});


//More Infos--------------------------
app.get('/details/:id', (req,res)=>{
    Article.findById(req.params.id)
    .then(result=>{
        res.render('details',{article:result})
    })
    .catch(error=>{
        console.log(error)
    })
})



//Edit--------------------------------
app.get("/edit/:id",(req,res)=>{
    Article.findById(req.params.id)
    .then(result=>{
        res.render('edit',{article:result})
    })
    .catch(error=>{
        console.log(error)
    })
})

app.post('/edit/:id',(req,res)=>{
    if(req.files){
        //upload images
        var file = req.files.avatar
        var filename = req.files.avatar.name
        file.mv('./public/images/'+filename,function(err){
            if(err){
                console.log(err)
            }else{
                console.log("File Uploaded")
            }
        })


        Article.updateOne({_id:req.params.id},{
            titre: req.body.titre,
            snippet: req.body.snippet,
            body: req.body.body,
            tag:req.body.tag,
            avatar: filename
        })
        .then(resultat=>{
            res.redirect('/');
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
})


//Delete------------------------------
app.delete('/details/:id',(req,res)=>{
    Article.findByIdAndDelete(req.params.id)
    .then(result=>{
        res.json({redirect:'/'})
    })
    .catch(error=>{
        console.log(error)
    })
})


//find one by TAG --------------------------
app.get('/:tag', (req,res)=>{
    Article.find({
        tag:req.params.tag,
    })
    .then(result=>{
        res.render('indexBlog',{articles:result})
    })
    .catch(error=>{
        console.log(error)
    })
})



//Email Post NewsLette----------------------
app.post('/email', (req, res) => {
    let newEmail = new Email(
    {
        email: req.body.email,
    }).save()
    .then(resultat=>{
        res.render('emailActive');
    })
    .catch(error=>{
        console.log(error)
    })
});





