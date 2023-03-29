const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose")
const api=require(__dirname+"/config.js")
const uid=api.uidd
const pwd=api.pswd

const dbUrl = "mongodb+srv://"+uid+":"+pwd+"@cluster38817.tfmkybi.mongodb.net/fruitsDB?retryWrites=true&w=majority"

const connectionParams={
  useNewUrlParser:true,
  useUNifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams)




app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


var items=[],workItems=[];


app.get("/",function(req,res){
  res.render("list",{ listTitle : date() ,newItem : items})
});


app.post("/",function(req,res){
  let item=req.body.listItem;

  if(req.body.list === "Work list"){
    workItems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/");
  }

})


app.get("/work",function(req,res){
  res.render("list",{listTitle : "Work list", newItem : workItems });
})



app.listen(3000,function(){
  console.log("listening");
});
