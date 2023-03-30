const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose")
const _=require("lodash")
const api=require(__dirname+"/config.js")
const uid=api.uidd
const pwd=api.pswd
const dbUrl = "mongodb+srv://Cluster38817:Z6F3nMnX0NubjbBE@cluster38817.tfmkybi.mongodb.net/toDoListDB?retryWrites=true&w=majority"
const connectionParams={
  useNewUrlParser:true,
  useUNifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams)
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const itemSchema=new mongoose.Schema({
  data:{
    type:String,
    minlength:1
  }
});
const itemListModel=mongoose.model("item",itemSchema);

const listSchema={
  name:String,
  items:[itemSchema]
};
const List=mongoose.model("List",listSchema);

const item1=new itemListModel({
  data:"Welcome to to-do list"
})
const item2=new itemListModel({
  data:"Click + to add new item"
})
const items=[item1,item2]

app.get("/",function(req,res){
  itemListModel.find().then((docs)=>{
    res.render("list",{ listTitle : date() ,newItem : docs })
  })
});


app.post("/",function(req,res){
  let item=req.body.listItem;
  var model=req.body.list
  const newListItem=new itemListModel({ data:item })
  if(req.body.list === date()){
    newListItem.save()
    res.redirect("/");
  }else {
    List.findOne({name:model}).then((docs)=>{
      docs.items.push(newListItem)
      docs.save()
      res.redirect("/"+model)
    })
  }
})


app.get("/:customListName",function(req,res){
  var customList=_.capitalize(req.params.customListName)
  List.findOne({name:customList}).then((docs)=>{
    if(!docs){
        const list=new List({
          name:customList,
          items:items
        })
        list.save()
        res.redirect("/"+req.params.customListName)
    }else {
      res.render("list",{listTitle:docs.name,newItem:docs.items})
    }
  })


})

app.post("/delete",(req,res)=>{
  const checkedItemId=req.body.checkBox
  const listName=req.body.listName
  if(listName===date()){
    itemListModel.deleteOne({_id:checkedItemId}).then()
    res.redirect("/")
  }else {
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}).then()
        res.redirect("/"+listName)
  }
})


app.listen(3000,function(){
  console.log("listening");
});
