import express from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import { BlogPostModel } from "../models/BlogPost.js";




const router = express.Router();



router.post("/addBlogPost", async (req, res) => {
    const { title, description, content, cover, author } = req.body;
    
    const blogPost = new BlogPostModel({
            title:title,
            description:description,
            content:content,
            cover: cover,
            author: author
        })
        await blogPost.save();

        res.json(blogPost.title);
 
})

router.get("/allBlogPosts", async (req, res) => {
    res.json(await BlogPostModel.find().populate('author'))


})


router.get("/blogPost/:id", async (req, res) => {
    const { id } = req.params
    console.log(id)
    const blogPost = await BlogPostModel.findById(id).populate('author')
    res.json(blogPost)

})












export { router as blogPostsRouter }