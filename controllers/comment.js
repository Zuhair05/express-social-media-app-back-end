const Comment = require('../models/comment');
const Post = require('../models/post');

const create = async (req, res) => {
    try {
        const comment = await Comment.create({
            text: req.body.text,
            author: req.user._id,
            post: req.params.postId,
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}



