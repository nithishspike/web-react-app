import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import  UserModel  from "./models/user.js";
import bodyParser from "body-parser";
import cors from "cors"
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser"
import {WebSocketServer} from "ws"
let app=express()
app.use(express.json())
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173",
credentials: true,}))
// app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config()
let jwtsecret=process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10)
mongoose.connect(process.env.MONGO_URL);
let gentoken;
app.use(cors({
    credentials:true,
    //origin:"http://localhost:5173"
}))
app.get("/start",(req,res)=>{
    res.send("hii").status(200);

})
app.get("/profile",(req,res)=>{
    let token=req.cookies?.token;
    console.log("print cookie",req.cookies);
    //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3M2YzZTY5ZTg2OGRiODI2NzIyY2QiLCJ1c2VybmFtZSI6ImFzZDQiLCJpYXQiOjE3MDk2NTM4MjV9.k68ReesDjzMGGBZ1jldy7GWLzKQ3HKQ4YGZs_BMyQ1c; Path=/";
    console.log(req.cookies,"hii")
    if(token){
        jwt.verify(token,jwtsecret,{},(err,data)=>{
            if(err) throw err;
            res.json(data);
        })
    }
    else
    res.status(201).json('no token');
})
app.post("/login",async(req,res)=>{
    let {user:username,pass:password}=req.body;
    let founduser =await UserModel.findOne({username});
    console.log(founduser,{username})
    if(founduser){
        let pasOk=bcrypt.compareSync(password,founduser.password)
        console.log(pasOk);
        if(pasOk)
        {
            console.log(username,password)
            jwt.sign({userId:founduser._id,username},jwtsecret,{},(err,token)=>{
                res.cookie("token",token,{secure:false}).json({id:founduser._id})
            })
        }
        else
        res.json("username not match")
    }
    else
    res.json("no user")
})
app.post("/register",async (req,res)=>{
    
    let {user:username,pass:password}=req.body;
    try{
        let hashedPassword=bcrypt.hashSync(password,bcryptSalt)
        let createduser=await UserModel.create({username,password:hashedPassword});
        jwt.sign({userId:createduser._id,username},jwtsecret,{},(err,token)=>{
            gentoken=token;
            if(err) throw err;
             res.cookie('token',token,{sameSite:'none',secure:false}).status(201).json({
                id:createduser._id,
            });
        })
    }
    catch(err){
        if(err) throw err;
        req.status(500);
    }
    console.log("api",req.body.user)
    //  res.send("hello").status(201);
})
console.log(process.env.MONGO_URL+process.env.Client_URL);
let server =app.listen("3000",(req,res)=>{
    console.log(`server running$3000`)
})
const wss=new WebSocketServer({server});
wss.on('connection', (connection,req) => {
    console.log('connected',req.headers);
    
    });
//console.log(server);
// //mongodb+srv://nithishkumarsrinivasann:aK63RYISbGy8QvOx@chat-app-data.hpj25rf.mongodb.net/?retryWrites=true&w=majority
