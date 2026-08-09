const express = require('express')
const Post = require('../models/post')

const create = async (req, res) => {
    try {
        req.body.author = req.user._id
        const post = await Post.create(req.body)
        res.status(201).json(post)
    }catch(err) {
        res.status(400).json({ err: err.message })
    }
}

