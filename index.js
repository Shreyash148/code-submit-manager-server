const express = require('express');
const db=require('./db');
const app=express();
const cors = require('cors');
const corsOptions = {
    origin: /\.onrender\.com$/,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/',require('./addSubmission'));
app.get("/",(req,res)=>{
    return res.json("hello you");
})
app.listen(8000,()=>{
    console.log("hello");
})