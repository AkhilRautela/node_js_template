var express=require('express');
var app= express();
var MongoClient = require('mongodb').MongoClient;
var fs= require('fs');
var url= require('url');
var datbase="mongodb://localhost:27017/mynewdb";
var hbs=require("express-handlebars");
var path= require('path');
var bodyParser= require('body-parser');
app.use(express.static('public'));
app.engine('hbs',hbs({extname:'hbs'}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('start');
    });
app.get('/logo',(req,res)=>{
    res.render('yoyo');
});
app.get('/hii',(req,res)=>{
   
    var q=url.parse(req.url,true);
    var z=q.query;
    console.log(z.name);
    console.log(z.pass);
    
    MongoClient.connect(datbase,(err,db)=>{
    var dbo= db.db('mynewdb');
  
    dbo.collection('names').insertOne(z,(err,res)=>{
     console.log('inserted');
    });

    });
    
    res.render('boss');
});
app.post('/login', bodyParser.urlencoded({ extended: false }) ,(req,res)=>{
    
    var username=req.body.name;
var password=req.body.pass;
var d=0;
console.log(username+" "+password);
MongoClient.connect(datbase,(err,db)=>{
    var dbo= db.db('mynewdb');
  
    var c=dbo.collection('names').findOne({name:username},function(err,c){
        if(c==null){
            console.log("galat");
            
            res.render('yoyo');
            
        
            
            
        }
    else if(c.pass==password){
        console.log("sahi hai");
        res.render('home');
        console.log(c.pass);
       

    }
    else{
        res.end("server problem");
       
    }
    

   
});
    });
    

});
app.listen(8080,()=>{
console.log("hello");
});