const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

const commentCtrl = async (req, res) => {
    const {message} = req.body;
    try {
      //!find post
      const post = await Post.findById(req.params.id);
      //!create comment
      const comment = await Comment.create({
        user: req.session.userAuth,
        message: message,
      })
      //!push the comment created to the post comments array
      post.comments.push(comment._id);
      //!find user
      const user = await User.findById(req.session.userAuth);
      //!push comment created to the user comments array
      user.comments.push(comment._id);
      //!disablble validation
      //!save post
      await post.save({ validateBeforeSave: false });
      //!save user
      await user.save({ validateBeforeSave: false });
      //!send response
      res.json({
        status: "success",
        data: comment,
      });
    } catch (error) {
      next(appErr(error.message));
    }
  }

const commentPostCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Post comments",
      });
    } catch (error) {
      res.json(error);
    }
  }

const commentDeleteCtrl =  async (req, res, next) => {
     try {
    //!find comment
    const comment = await Comment.findById(req.params.id);
    //!check if the post belongs to user
    if(comment.user.toString() !== req.session.userAuth) {
      return next(appErr("You are not authorized to delete this comment", 403));
    }
    //!delete
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "comment deleted",
    });
  } catch (error) {
    next(appErr(error.message, 404));
  }
  }

const commentUpdateCtrl =  async (req, res, next) => {
    try {
      res.json({
        status: "success",
        user: "comment updated",
      });
    } catch (error) {
      res.json(error);
    }
  }

  module.exports ={
    commentCtrl, commentPostCtrl, commentDeleteCtrl, commentUpdateCtrl
};
