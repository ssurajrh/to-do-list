const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
var items=[];
var workItems=[];


app.get("/",function(req,res){
  var today=new Date();
  var currentDay=today.getDay();


  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  var dayy=today.toLocaleDateString("en-US",options);

  res.render("list",{ listTitle : dayy ,newItem : items})
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

app.get("/about",function(req,res){
  res.render("about");
})


app.get("/work",function(req,res){
  res.render("list",{listTitle : "Work list", newItem : workItems });
})

app.listen(3000,function(){
  console.log("listening");
});
