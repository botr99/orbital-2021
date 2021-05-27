const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.get("/", async (req, res) => {
  try {
    // find all posts
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    author: req.body.author,
  });

  // do some post validation here

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.json(deletedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
