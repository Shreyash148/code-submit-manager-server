const db=require('./db');
const express = require('express');
const route = express.Router();
const {Redis} = require('ioredis');
const redis = new Redis("rediss://default:ca7f5b5c05c74b01b272b81b1157b675@usw1-vocal-gazelle-34568.upstash.io:34568");

route.post("/add",async (req,res)=>{
    const {username,language,stdin,sourcecode,stdout}=req.body;
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomString = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const counter = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const submissionId=timestamp+randomString+counter;
    const created_at=new Date().toISOString();
    await redis.hset("subIds",submissionId,submissionId);
    const q="INSERT INTO submission(`username`,`language`,`stdin`,`sourceCode`,`submissionId`,`stdout`,`created_at`) VALUES(?)";
    const values=[username,language,stdin,sourcecode,submissionId,stdout,created_at];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("data inserted successfully");
    })
});

route.get("/show",async(req,res)=>{
    let allSubmit=[];
    const ids=await redis.hgetall("subIds");
    if(ids){
        for (const [key, value] of Object.entries(ids)) {
            const check=await redis.get(value);
            if(check){
                allSubmit.push(JSON.parse(check));
            }else{
                const q="SELECT * FROM submission WHERE submissionId=?";
                db.query(q,value,async(err,data)=>{
                    if(err)return res.json(err);
                    allSubmit.push(data[0]);
                    await redis.set(value,JSON.stringify(data[0]));
                });
            }
        }
        return res.json(allSubmit);
    }else{
        const q="SELECT * FROM submission";
        db.query(q,(err,data)=>{
            if(err)return res.json(err);
            return res.json(data);
        });
    }
});

module.exports=route;