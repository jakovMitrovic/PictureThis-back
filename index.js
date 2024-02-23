const port = 4000;
import express from "express";
const app = express();
import mongoose from "mongoose"
import multer from "multer";
import cors from "cors"
import { mongoDBURL } from "./config.js";
import {productsRouter} from './routes/products.js'



app.use(express.json());
app.use(cors());


///database connection
mongoose.connect(mongoDBURL)

// api

app.get('/', (req, res)=>{
    res.send('express app is running')
})

app.listen(port, (err)=>{
    if(!err){
        console.log("server running")
    }else{
        console.log(err)
    }
})


app.use('/products', productsRouter)



//image


const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

///upload endpoint

app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res)=>{
    res.json({
        success: 1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


