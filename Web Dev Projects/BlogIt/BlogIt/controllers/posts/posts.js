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
        data: postCreated,
      });
    } catch (error) {
     next(appErr(error.message));
    }
  }

const fetchPostsCtrl =  async (req, res, next) => {
    try {
      //!find all posts in db
      const posts = await Post.find();
      res.json({
        status: "success",
        data: posts,
      });
    } catch (error) {
      next(appErr(error.message));
    }
  }

const fetchPostCtrl =  async (req, res, next) => {
    try {
      //!get id from params
      const id = req.params.id;
      //!find the post in db
      const post = await Post.findById(id);
      //!res.json({ status: "success", post: post });
      res.json({
        status: "success",
        data: post,
      });
    } catch (error) {
      next(appErr("Post not found", 404));
    }
  }

const deletePostCtrl =  async (req, res, next) => {
     try {
        //!find post
      const post = await Post.findById(req.params.id);
      //!check if the post belongs to user
      if(post.user.toString() !== req.session.userAuth) {
        return next(appErr("You are not authorized to delete this post", 403));
      }
      //!delete
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      res.json({
        status: "success",
        data: "Post deleted",
      });
    } catch (error) {
      next(appErr(error.message, 404));
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
