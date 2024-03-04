
import express from "express";
import  jwt  from "jsonwebtoken";

import { Product } from '../models/Product.js';


const router = express.Router();


const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
    console.log(req.headers)
    if(token){
        jwt.verify(token, "secret", (error)=>{
            if(error) return res.sendStatus(403);
            next();
        })
    } else{
        res.sendStatus(401)
        }
    }


router.post('/addProduct', async (req, res) => {
    const { name,
        brand,
        model,
        price,
        sale_price,
        image, category,
        available,

        focalLength,
        fStop,
        lensMount,

        megaPixel,
        sensor,
        mount,

        desc

    } = req.body
    const product = new Product({
        name: name,
        brand: brand,
        model: model,
        price: price,
        sale_price: sale_price,
        image: image,
        category: category,
        available: available,

        focalLength: focalLength,
        fStop: fStop,
        lensMount: lensMount,

        megaPixel: megaPixel,
        sensor: sensor,
        mount: mount,

        desc: desc,

    })
 

    await product.save();

    console.log('Saved')

    res.json({
        success: true,
        name: name
    })
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    await Product.deleteOne({ _id: id });
    res.json('deleted')

})


router.get('/product/:id', async (req, res) => {
    const { id } = req.params

    const product = await Product.findOne({_id:id})
    res.send(product)

})

router.get('/allProducts', async (req, res) => {
    const products = await Product.find({})

    res.send(products)
})


router.put("/edit", verifyToken, async (req, res) => {
    const _id  = req.body._id;
    console.log(_id)
   try {
       const product = await Product.findOneAndUpdate({_id: _id}, req.body, )
     
       res.json({ message:"ok", success: true, })

   } catch (error) {
       res.json(error)
   }

})





export { router as productsRouter }