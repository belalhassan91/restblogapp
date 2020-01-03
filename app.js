var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

const port = 3100;
const ejs  = require('ejs'); 
//-------------------------------------------------------------------    
//Configure App
mongoose.connect('mongodb://localhost:27017/blogapp', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine",ejs);
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
//RESTful Routes

app.listen(port, () => console.log(`Example app listening on port ${port}!`))