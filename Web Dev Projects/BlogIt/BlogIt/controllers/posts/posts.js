const User = require("../../models/User");
const Post = require("../../models/Post");
const appErr = require("../../utils/appErr");

const createPostCtrl = async (req, res, next) => {
    try {
        if(!title || !description || !category || !req.file) {
        return next(appErr("All fields are required", 400));
      }
        //!find the user
      const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        const postCreated = await Post.create({
        title,
        description,
        category,
        image: req.file.path,
        user: userFound._id,
      });
        //!push the post created to the user posts array
      userFound.posts.push(postCreated._id);
      //!resave
      await userFound.save();
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
