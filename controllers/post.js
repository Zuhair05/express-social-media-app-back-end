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

const index = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('author', 'username')
        .sort({ createdAt: "desc" })
        res.status(200).json(posts)
    }catch(err) {
        res.status(500).json({ err: err.message })
    }
}

const show = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username')
        res.status(200).json(post)
    }catch(err) {
        res.status(500).json({ err: err.message })
    }
}

