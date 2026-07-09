require("dotenv").config();

// importing bcrypt
const bcrypt= require("bcrypt");

// importing cors to link backend to frontend
const cors=require("cors");

// importing jsonwebtoken(JWT)
const jwt=require("jsonwebtoken");

// importing our planets model object from module folder.
const Planet=require("./models/Planet.js");

// important users model object from module folder
const User=require("./models/User.js");



// importing mongoose and then connecting it to a cluster.
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});

// importing express and creating an express server accessed by the variable app.
const express=require("express");
const app=express();

 

// middlewares
app.use(cors());
app.use(express.json());
// auth middleware
function auth(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"No token provided"
        })
    }
    const token=authHeader.split(" ")[1]  // authHeader.split creates an array with ["Bearer", token]
    try{
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            message: "Invalid token"
        })
        
    }
}



//enpoints for server requests

// protected route
app.get("/profile",auth, async (req,res)=>{
    try{
        let user=await User.findById(req.user.userId);
        res.json({
            username: user.username,
            email: user.email,
            added: user.added,
            searched: user.searched

        })
    }
    catch(err){
        res.status(500).json({
        message: err.message
        });
    }
})
app.get("/",(req,res)=>{
    res.send("Welcome to planetvault!");
})
// using auth makes a route protected, as it has to go with the auth middleware
app.get("/planet", auth, async (req,res)=>{
    try{
        const {name}=req.query;
        if(name){
            const planets=await Planet.find({
                name:{
                    $regex:name,
                    $options:"i"
                },
                
            });
            
            return res.json(planets);
        }
        
        const planets=await Planet.find();
        return res.json(planets);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
        
    }
    
})

app.post("/planet",auth, async (req,res)=>{
    try{
        const newData = await Planet.create(req.body);
        res.json(newData);
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
        
    }
})

app.put("/planet/:id", auth, async (req,res)=>{
    try{
        const updatedPlanet=await Planet.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }); // assuming the updated document would be give with the request
            // new: true --> what happens here is the crud thing actually updates the mongodb database and
            // but returns the old data.. so new:true updates the variable updatedPlanet.
        if(!updatedPlanet){
            return res.status(404).json({
                message: "Couldn't find planet with that id"
            })
        } 
        res.json(updatedPlanet);
    } 
    catch(err){
        res.status(500).json({
            message: err.message
        })
        
    }
})

app.post("/signup", async (req,res)=>{
    try{
        const bcryptPass= await bcrypt.hash(req.body.password,10);
        req.body.password=bcryptPass
        const newUser = await User.create(req.body);
        res.json({
            username:newUser.username,
            email:newUser.email,
            added: newUser.added,
            searched: newUser.searched

        });
    } 
    catch(err){
        res.status(500).json({
            message:err.message
        })
        
    }
})
app.post("/login", async (req,res)=>{
    try{
        const user=await User.findOne({
            email: req.body.email
        })
        if(!user){
            return res.status(404).json({
                message: "Bad Request"
            })
        }
        const isMatch=await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(401).json({
                message: "Wrong Password"
            })
        }
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )
        res.status(200).json({
            message: "Success",
            token: token
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
        
    }
})
// we need routes to see added and searched planets on the frontend, as well as a route to update them...
app.get("/getAddedSearched", auth, async (req,res)=>{
    try{
        let user=await User.findById(req.user.userId);
        res.status(200).json({
            added: user.added,
            searched: user.searched

        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    } 
})
app.put("/changeAddedSearched", auth, async (req,res)=>{
    try{
        let userData=await User.findByIdAndUpdate(req.user.userId, req.body, { returnDocument: "after" });
        res.status(200).json(userData);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})
// adding a route in order to change existing user data, and delete user account...
app.put("/editProfile", auth, async(req,res)=>{
    try{
        
        let updatedData = {};

        if(req.body.username){
            updatedData.username = req.body.username;
        }

        if(req.body.email){
            updatedData.email = req.body.email;
        }


        if(req.body.password){
            updatedData.password=await bcrypt.hash(req.body.password,10)
        }

        const userData= await User.findByIdAndUpdate(req.user.userId, updatedData, { returnDocument: "after" })
        res.status(200).json(userData);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})
app.delete("/deleteProfile", auth, async(req,res)=>{
    try{
        const deletedData= await User.findByIdAndDelete(req.user.userId);
        res.status(200).json(deletedData);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

// starting the server and providing it with the port number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});