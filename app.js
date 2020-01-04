var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

const port = 3100;
const ejs  = require('ejs'); 
//-------------------------------------------------------------------    
//Configure App
mongoose.connect('mongodb://localhost:27017/blogapp', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs'); 
app.use(express.static("public")); //we can serve custom style sheets
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({extended: true}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
//------------------------------------------------------------------- 
//Configure Mongoose
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default:Date.now} //create a field with default value
})

var Blog = mongoose.model("Blog",blogSchema);
//-------------------------------------------------------------------
//First Insert
// Blog.create({
//     title: "Doc1",
//     image: "https://www.google.com/search?q=images&sxsrf=ACYBGNSLNpQOeszYqN99KFoVdfNH0YTSTQ:1578084678435&tbm=isch&source=iu&ictx=1&fir=aT1lQMo5nzpYfM%253A%252CpFs_4Fcq5AgpmM%252C_&vet=1&usg=AI4_-kRn00tCo2yLOqdsKFKZLLtDzoFynw&sa=X&ved=2ahUKEwjN07vFp-jmAhWy6uAKHaM6CNsQ9QEwAHoECAoQLw#imgrc=aT1lQMo5nzpYfM:",
//     body:"beautidul landscape"
// },function (err,blog) {
//     if(err){
//         console.log("Can't insert new data");
//         console.log(err);
//     }else {
//         console.log(blog)
//     }
// });
//-------------------------------------------------------------------
//RESTful Routes
app.get("/",(req,res) => {
    res.redirect("/blogs");
})

//INDEX Route
app.get("/blogs",(req,res) => {
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index',{blogs:blogs});
        }
    })
    
})

//NEW Route
app.get("/blogs/new", (req,res)=>{
    res.render('new')
})
//Create Route
app.post("/blogs",(req,res)=>{
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err){
            res.redirect("/blogs/new");
        }else{
            console.log(newBlog)
            res.redirect("/blogs")
        }
    })
})

//Show Routes
app.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))