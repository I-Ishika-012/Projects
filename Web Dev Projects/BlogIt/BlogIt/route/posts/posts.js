const express = require("express");
const {createPostCtrl, updatePostCtrl, deletePostCtrl, fetchPostCtrl, fetchPostsCtrl } = require("../../controllers/posts/posts");
const postRoutes = express.Router();
const protected = require("../../middlewares/protected");
const multer = require("multer");
const storage = require("../../config/cloudinary");

//?instance of multer
const upload = multer({ storage });

//POST/api/v1/posts
postRoutes.post("/", protected, upload.single("file"), createPostCtrl); 

  //GET/api/v1/posts
  postRoutes.get("/", fetchPostsCtrl);

  //GET/api/v1/posts/:id
  postRoutes.get("/:id", fetchPostCtrl);
  
  //DELETE/api/v1/posts/:id
  postRoutes.delete("/:id", protected, deletePostCtrl);
  
  //PUT/api/v1/posts/:id
  postRoutes.put("/:id", updatePostCtrl);

module.exports = postRoutes;
