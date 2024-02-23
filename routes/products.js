
import express from "express";


import { Product } from '../models/Product.js';


const router = express.Router();


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






export { router as productsRouter }