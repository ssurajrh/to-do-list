const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");


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
