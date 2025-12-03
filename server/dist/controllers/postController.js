"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.commentGetPost = exports.commentPost = exports.likePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const validators_1 = require("../utils/validators");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const getPosts = async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(100, Number(req.query.limit) || 10);
        const sortBy = req.query.sort || 'date';
        const search = req.query.q || '';
        const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
        const sortObj = sortBy === 'likes'
            ? { likes: -1, date: -1 }
            : { date: -1, likes: -1 };
        const total = await Post_1.default.countDocuments(filter);
        const posts = await Post_1.default.find(filter)
            .sort(sortObj)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        res.json({ data: posts, meta: { page, limit, total } });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getPosts = getPosts;
const getPost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Not found' });
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getPost = getPost;
const createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User_1.default.findById(req.user.id).select('username avatar');
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const parsed = validators_1.postCreateSchema.parse(req.body);
        const newPost = new Post_1.default({
            ...parsed,
            author: user.username,
            authorAvatar: user.avatar ? `/uploads/${user.avatar}` : '',
            userId: req.user.id,
        });
        const saved = await newPost.save();
        res.status(201).json(saved);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};
exports.createPost = createPost;
const likePost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Post not found' });
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const hasLiked = post.likes.some((id) => id.toString() === userId);
        if (hasLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        }
        else {
            post.likes.push(userObjectId);
        }
        await post.save();
        res.json({ likes: post.likes, liked: !hasLiked, count: post.likes.length });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.likePost = likePost;
const commentPost = async (req, res) => {
    try {
        if (!req.user) {
            console.log('Unauthorized: no req.user');
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('req.user', req.user);
        const { text } = req.body;
        if (!text || !text.trim()) {
            console.log('Validation failed: empty text');
            return res.status(400).json({ message: 'Text is required' });
        }
        const user = (await User_1.default.findById(req.user.id).select('username'));
        if (!user) {
            console.log('User not found for id', req.user.id);
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.username) {
            console.log('User has no username for id', req.user.id);
            return res.status(500).json({ message: 'User has no username' });
        }
        const post = await Post_1.default.findById(req.params.id);
        if (!post) {
            console.log('Post not found for id', req.params.id);
            return res.status(404).json({ message: 'Post not found' });
        }
        const comment = {
            userId: user._id.toString(),
            username: user.username,
            text,
            createdAt: new Date(),
        };
        console.log('Comment to add', comment);
        post.comments.push(comment);
        await post.save();
        console.log('Comment added successfully');
        res.status(201).json(comment);
    }
    catch (err) {
        console.error('Error in comment Post', err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.commentPost = commentPost;
const commentGetPost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Post not found' });
        const sortedComments = post.comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        res.json(sortedComments);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.commentGetPost = commentGetPost;
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, excerpt } = req.body;
        const post = await Post_1.default.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (req.user?.role !== 'admin' && req.user?.username !== post.author) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (title)
            post.title = title;
        if (excerpt)
            post.excerpt = excerpt;
        const updated = await post.save();
        res.json(updated);
    }
    catch (error) {
        console.error('Error updating post', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updatePost = updatePost;
