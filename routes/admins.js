import express from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import { AdminModel } from "../models/Admin.js";



const router = express.Router();

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (error)=>{
            if(error) return res.sendStatus(403);
            next();
        })
    } else{
        res.sendStatus(401)
        }
    }




router.post("/register", async (req, res)=>{
    const {username, password} = req.body;
    
     const admin =  await AdminModel.findOne({username: username})
    if(admin){
         return res.json({message: "User alredy exist!"})
     }
    const hashedPassword = await bcrypt.hash(password, 10)
   
    const newAdmin = new AdminModel(
                {
                    username: username,
                    password: hashedPassword, 
                    
                })
                
            
            
    await newAdmin.save()
    res.json({message: "User registered successfully"});



});


router.post("/login", async(req, res)=>{
    const {username, password} = req.body;
    const admin = await AdminModel.findOne({ username: username})
    
    if(!admin){
        return res.json({message: "User doesn't exist"})
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect!"})
    }

    const token = jwt.sign({id:admin._id}, "secret")
    const _id = admin._id
    console.log(_id)
    res.json({ message:"ok", _id, token, username})

})

router.get(`/getUser/:userId`, async(req, res)=>{
    //const {_id} = req.body;
    try {
        const admin = await AdminModel.findById(req.params.userId)
        res.json(admin)
        
    } catch (error) {
        res.json(error)
    }
})


router.get("/getAll", async(req, res)=>{
    try {
        const response = await AdminModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})


router.put("/edit", async (req, res) => {
     const _id  = req.body._id;
     console.log(_id)
    try {
        const admin = await AdminModel.findOneAndUpdate({_id: _id}, req.body, )
      
        res.json({ message:"ok" })

    } catch (error) {
        res.json(error)
    }

})



export {router as adminRouter}



export {verifyToken}
