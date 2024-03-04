import mongoose from "mongoose"

const Admin = mongoose.model('Admin', {

    username: {type: String, required: true, unique:true},
    password:{type: String, required: true},

    
})


export {Admin as AdminModel}