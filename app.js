require("dotenv").config();
const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const _=require("lodash");
const mongoose=require("mongoose")
app.use(bodyparser.urlencoded({extended:true}));
const startcontent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus molestias ab cumque ea minus, quam voluptatibus doloremque accusantium a, consectetur voluptas architecto quasi esse, beatae iste neque reprehenderit nullaa.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus molestias ab cumque ea minus, quam voluptatibus doloremque accusantium a, consectetur voluptas architecto quasi esse, beatae iste neque reprehenderit nulla.";
const middlecontent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus molestias ab cumque ea minus, quam voluptatibus doloremque accusantium a, consectetur voluptas architecto quasi esse, beatae iste neque reprehenderit nulla.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus molestias ab cumque ea minus, quam voluptatibus doloremque accusantium a, consectetur voluptas architecto quasi esse, beatae iste neque reprehenderit nulla."
const lastcontent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus molestias ab cumque ea minus, quam voluptatibus doloremque accusantium a, consectetur voluptas architecto quasi esse, beatae iste neque reprehenderit nulla.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto temporibus molestias ab cumque ea minus, quam voluptatibus doloremque accusantium a, consectetur voluptas architecto quasi esse, beatae iste neque reprehenderit nulla."
app.use(express.static("public"));
app.set('view engine','ejs');

// let posts=[];
mongoose.connect(DBURL)
.then(res=>{
    console.log("mongodb connected");
})
.catch(err=>{
    console.log(err); 
})
const blogschema=mongoose.Schema({
    title:String,
    bodycontent:String
})
const blogmodel=mongoose.model("blog",blogschema);
//  const data=new blogmodel({
//     title:"Nmae",
//     bodycontent:"lajf alsjflkajs ljlskjfla ljsld jflaj"
//  })

app.get("/posts/:url",function(req,res){
    // let result;
    blogmodel.find().exec()
    .then(rest=>{
        //    result=rest;
            rest.forEach(function(element){
            if(_.lowerCase(element.title)===_.lowerCase(req.params.url)){
               res.render("posts",{title:element.title,content:element.bodycontent});
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
 
  
})


app.get("/",(req,res)=>{
    blogmodel.find().exec()
    .then(result=>{
        res.render("list",{content:startcontent,
            post:result});
    })
    .catch(err=>{
        console.log(err);
    })


});
app.get("/about",(req,res)=>{
res.render("about",{content:middlecontent});
});
app.get("/contact",(req,res)=>{
    res.render("contact",{content:lastcontent});
});
app.get("/compose",(req,res)=>{
    res.render("compose");
})
app.post("/compose",(req,res)=>{

   const post= new blogmodel({
    title:req.body.posttitle,
    bodycontent:req.body.postbody 
   })
//    posts.push(post);
post.save();

  
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server started ");
})
