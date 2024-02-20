const User = require("../../models/User");
const Post = require("../../models/Post");

const createPostCtrl = async (req, res) => {
    try {
        //!find the user
      const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        const postCreated = await Post.create({
        title,
        description,
        category,
        image,
        user: userFound._id,
      });
      res.json({
        status: "success",
        user: "Post created",
      });
    } catch (error) {
      res.json(error);
    }
  }

const fetchPostsCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Posts list",
      });
    } catch (error) {
      res.json(error);
    }
  }

const fetchPostCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Post details",
      });
    } catch (error) {
      res.json(error);
    }
  }

const deletePostCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Post deleted",
      });
    } catch (error) {
      res.json(error);
    }
  }

const updatePostCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Post updated",
      });
    } catch (error) {
      res.json(error);
    }
  }

  module.exports = {
    createPostCtrl,
    fetchPostsCtrl,
    fetchPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
  }
