import mongoose from "mongoose"

const Product = mongoose.model('Product', {
    name: {type: String, required: true},
    brand:{type: String, required: true},
    model:{type: String, required: true},
    price: {type: Number, required: true},
    sale_price: {type: Number},
    image:{type: String, required: true},
    category:{type: String, required: true},
    available:{type:Boolean, default: true},


    focalLength:{type:String},
    fStop:{type:String},
    lensMount:{type:String},


    megaPixel:{type:String},
    sensor:{type:String},
    mount:{type:String},

    desc:{type:String},
    
})


export {Product}