const mongoose = require("mongoose");
const Blog = require("../models/blogModel")

const blogCtrl = {
    createBlog: async (req, res) => {
        const blog = req.body;
        const newBlog = new Blog({
            ...blog,
            creator: req.userId,
            createdAt: new Date().toString()
        })
        try {
            await newBlog.save();
            res.status(201).json(newBlog);
        } catch (error) {
            res.status(404).json({ message: "Something went wrong" })
        }
    },

    getBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.status(200).json(blogs)
        } catch (error) {
            res.status(404).json({ message: "Something went wrong" })
        }
    },

    getBlog: async (req, res) => {
        const { id } = req.params
        try {
            const blog = await Blog.findById(id)
            res.status(200).json(blog)
        } catch (error) {
            res.status(404).json({ message: "Something went wrong" })
        }
    },
    getBlogByUser: async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "User does not exists" })
        }
        const userBlogs = await Blog.find({ creator: id })
        res.status(200).json(userBlogs)
    },

    updateBlog: async (req, res) => {
        const { id } = req.params;
        const { title, description, creator, imageFile, tags } = req.body
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ message: "No Blog exists with this id" })
            }
            const updatedBlog = {
                creator, title, description, imageFile, tags, _id: id
            }
            await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
            res.json(updatedBlog)
        } catch (error) {
            res.status(404).json({ message: "Something went wrong" })
        }
    },

    deleteBlog: async (req, res) => {
        const { id } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ message: "No Blog exists with this id" })
            }
            await Blog.findByIdAndRemove(id)
            res.status(200).json({ message: "Blog Deleted Succesfully" })
        } catch (error) {
            res.status(404).json({ message: "Something went wrong" })
        }
    },
}





module.exports = blogCtrl