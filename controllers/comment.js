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

const index = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('author', 'username')
            .sort({ createdAt: "desc" });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

const update = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const comment = await Comment.findById(req.params.commentId);

        if (comment.author.toString() !== req.user._id) {
            return res.status(403).send("You're not allowed to do that!");
        }

        comment.text = req.body.text;
        await comment.save();
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}
