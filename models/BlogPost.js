import mongoose, { Schema } from "mongoose"

const BlogPost = mongoose.model('BlogPost', {

    title: {type: String, required: true},
    description:{type: String, required: true},
    content:{type: String, required: true},
    cover:{type: String, required: true},
    author:{type:Schema.Types.ObjectId, ref:"Admin"},
    
})


export {BlogPost as BlogPostModel}