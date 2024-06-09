const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const Comment = require("../../models/comment/Comment");
const appErr = require("../../utils/appErr");

const commentCtrl = async (req, res, next) => {
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
      //!redirect
      res.redirect(`/api/v1/posts/${req.params.id}`);
    } catch (error) {
      next(appErr(error.message));
    }
  }

const commentPostCtrl =  async (req, res, next) => {
    try {
      res.json({
        status: "success",
        user: "Post comments",
      });
    } catch (error) {
      next(appErr(error.message, 404));
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
    //!redirect
    res.redirect(`/api/v1/posts/${comment._id}`);
  } catch (error) {
    next(appErr(error.message, 404));
  }
  }

const commentUpdateCtrl =  async (req, res, next) => {
   try {
    //!find comment
    const comment = await Comment.findById(req.params.id);
       //!null check for comment
    if(!comment) {
      return next(appErr("Comment not found", 404));
    }
    //!check if the comment belongs to user
    if(comment.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not authorized to update this comment", 403));
    }
    //!update
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
      message: req.body.message,
    }, 
    { new: true });
    res.json({
      status: "success",
      data: updatedComment,
    });
  } catch (error) {
    next(appErr(error.message, 404));
  }
  }

  module.exports ={
    commentCtrl, commentPostCtrl, commentDeleteCtrl, commentUpdateCtrl
};
