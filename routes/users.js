import express from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import { UserModel } from "../models/User.js";



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
    const {username, password, email} = req.body;
    
     const user =  await UserModel.findOne({username: username})
    if(user){
         return res.json({message: "User alredy exist!"})
     }
    const hashedPassword = await bcrypt.hash(password, 10)
   
    const newUser = new UserModel(
                {
                    username: username,
                    password: hashedPassword, 
                    email:email,
                    
                })
                
            
            
    await newUser.save()
    res.json({message: "User registered successfully"});



});


router.post("/login", async(req, res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username: username})
    
    if(!user){
        return res.json({message: "User doesn't exist"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect!"})
    }

    const token = jwt.sign({id:user._id}, "secret")
    const userId = user._id
    res.json({message: "ok", token, userId})

})

router.get(`/getUser/:userId`, async(req, res)=>{
    //const {_id} = req.body;
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json(user)
        
    } catch (error) {
        res.json(error)
    }
})


router.get(`/cart/:userId`, async(req, res)=>{
    //const {_id} = req.body;
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json(user.cart)
        
    } catch (error) {
        res.json(error)
    }
})

router.put(`/cart/:userId`, async(req, res)=>{
    const _id = req.params.userId;
    try {
        const userValues = await UserModel.findById(req.params.userId)

        const user = await UserModel.findOneAndUpdate({_id: _id}, {username: userValues.username,
                                                                    _id:userValues._id,
                                                                password:userValues.password,
                                                            cart:req.body},)
        res.json(user.cart)
        
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


router.get("/getAll", async(req, res)=>{
    try {
        const response = await UserModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})


router.put("/edit", async (req, res) => {
     const _id  = req.body._id;
    try {
        const user = await UserModel.findOneAndUpdate({_id: _id}, req.body, )
      
        res.json({ message:"ok" })

    } catch (error) {
        res.json(error)
    }

})



export {router as userRouter}



export {verifyToken}
