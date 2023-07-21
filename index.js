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
const Product = require("./db/Product");

const cors = require('cors');
require('./db/config');
const app = express();

app.use(express.json());
app.use(cors());

// all API is here
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

// Login Route
app.post("/login", async (req, resp) => {
    try {
        if(req.body.password && req.body.email){
            const user = await User.findOne( req.body).select("-password");
            if (user) {
                resp.send(user);
            } else {
                resp.send({ result: 'No user found' });
            }
        }else{
            resp.send({ result: 'No user found' });
        }
       
    } catch (error) {
        // Handle any potential errors that might occur during the database query or response sending.
        resp.status(500).send({ error: 'An error occurred' });
    }
});

//Add Product Route

app.post("/add-product",async (req,resp)=>{
 let product = new Product(req.body); 
 let result = await product.save(); 
 resp.send(result) 
})

// Get Product listing

app.get("/products",async(req,resp)=>{
    let products = await Product.find();
    if(products.length > 0){
        resp.send(products)
    }else{
        resp.send({result:"No Products Found"})
    }
    // resp.send(products)
})

app.listen(5000);
