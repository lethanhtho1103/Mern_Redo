const Post = require("../models/Post");

const postController = {
  addPost: async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
      return res.status(400).json("Title is required");
    }
    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
        user: req.userId,
      });
      await newPost.save();
      return res.status(200).json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.userId });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  },

  updatedPost: async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
      return res.status(400).json("Title is required");
    }
    try {
      let updatedPost = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        status: status || "TO LEARN",
      };
      const updatedPostCondition = { _id: req.params.id, user: req.userId };
      updatedPost = await Post.findOneAndUpdate(
        updatedPostCondition,
        updatedPost,
        {
          new: true,
        }
      );
      if (!updatedPost) {
        return res.status(401).json("Post not found or user not authorized");
      }
      res.json({
        message: "Excellent progress!",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  },

  deletedPost: async (req, res) => {
    const deletedPostCondition = { _id: req.params.id, user: req.userId };
    const deleted = await Post.findOneAndDelete(deletedPostCondition);
    if (!deleted) {
      return res.status(401).json("Post not found or user not authorized");
    }
    res.status(200).json("Post deleted successfully");
  },
};

module.exports = postController;
