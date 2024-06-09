const User = require("../../models/User");
const Post = require("../../models/Post");
const appErr = require("../../utils/appErr");

const createPostCtrl = async (req, res, next) => {
    try {
        if(!title || !description || !category || !req.file) {
        return res.render("posts/addPost", { error: "All fields are required" });
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
      //!redirect
    res.redirect("/");
    } catch (error) {
     return res.render("posts/addPost", { error: error.message });
    }
  }

const fetchPostsCtrl =  async (req, res, next) => {
    try {
      //!find all posts in db
      const posts = await Post.find().populate("comments");
      res.render('posts/postDetails', { 
        posts,
        error: "",
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
      const post = await Post.findById(id).populate("comments").populate("user");
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
        return res.render("posts/postDetails", { error: "You are not authorized to delete this post", post });
      }
      //!delete
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
           //!redirect
     res.redirect("/");
    } catch (error) {
      return res.render("posts/postDetails", { error: error.message, post : "", });
    }
  }

const updatePostCtrl =  async (req, res) => {
  const { title, description, category, image} = req.body;
  //!prevent empty data
  if(!title || !description || !category || !req.file) {
    return next(appErr("All fields are required", 400));
  }
    try {
      //!find post
      const post = await Post.findById(req.params.id);
      //!check if the post belongs to user
      if(post.user.toString() !== req.session.userAuth.toString()) {
        return res.render("posts/updatePost", { error: "You are not authorized to update this post",
          post,
         });
      }
      //! check if user is updating image
      if(req.file) {
      await Post.findByIdAndUpdate(req.params.id, {
        title,
        description,
        category,
        image: req.file.path,
      }, 
      { new: true });
      }
      else {
         //!update
        await Post.findByIdAndUpdate(req.params.id, {
          title,
          description,
          category, 
        }, 
        { new: true });
      }
      //!redirect
      res.redirect("/");
    } catch (error) {
      return res.render("posts/updatePost", { error: error.message,
        post : "",
       });
    }
  }

  module.exports = {
    createPostCtrl,
    fetchPostsCtrl,
    fetchPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
  }
