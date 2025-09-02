const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors")


const { getAllUsers, getAllRegister } = require("./controllers/userControl");
const { getAllProducts } = require("./controllers/productControl");

// const userAuthenticats = (req,res, next)=>{
//     console.log("inside userAuthenticated");

//     next();
// }

// const sampleApplication = (req,res,next)=>{
//     console.log("sample application level middleware");
//     next();
// }

// app.use(sampleApplication);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials:true,origin:true}));
app.use('/api/v1/uploads',express.static('uploads'));

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");



app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute)



app.use((err,req,res,next)=>{
    res.send(err.message)
})  

module.exports = app;