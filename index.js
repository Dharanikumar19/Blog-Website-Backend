require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const morgan = require("morgan")
const userRouter = require("./routes/userRouter")
const blogRouter = require("./routes/blogRouter")

//middleware
app.use(express.json({limit :"30mb", extended : true}));
app.use(express.urlencoded({limit : "30mb", extended : true}))

app.use(cors());
//logger
app.use(morgan('tiny'))

//connect to db
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, err => {
    if(err) throw err;
    console.log("database connected successfully")
})

// api endpoint
app.use("/users", userRouter); 
app.use("/blogs", blogRouter); 


app.get("/", (req,res) => {
    res.json({message : "Server is up and running"})
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {console.log("Server is running on port", PORT)})