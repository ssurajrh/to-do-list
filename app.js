const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
var items=[];


app.get("/",function(req,res){
  var today=new Date();
  var currentDay=today.getDay();


  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  var dayy=today.toLocaleDateString("en-US",options);

  res.render("list",{ kindOfDay : dayy ,newItem : items})
});

app.post("/",function(req,res){
  items.push(req.body.listItem);
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("listening");
});
