// const express =  require('express');
// const mongoose = require('mongoose');
// const app = express();

// const connectDB = async ()=>{
//     mongoose.connect('mongodb://localhost:27017/e-comm');
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('product',productSchema);
//     const data= await product.find();
//     console.warn('data',data)
// }

// connectDB();
// // app.get("/",(req,resp)=>{
// //     resp.send("app is working...")
// // })

// app.listen(5000);


// ************************Or


const express = require("express");
const User = require("./db/User");
const cors = require('cors');
require('./db/config');
const app = express();

app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result);
})


app.listen(5000);
