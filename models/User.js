import mongoose from "mongoose"

const User = mongoose.model('User', {

    username: {type: String, required: true, unique:true},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true},
    cart:{type: Array}
    
})


export {User as UserModel}