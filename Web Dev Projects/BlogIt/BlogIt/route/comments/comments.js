const express = require("express");
const commentRoutes = express.Router();
const { commentCtrl, commentPostCtrl, commentDeleteCtrl, commentUpdateCtrl } = require("../../controllers/comments/comments");

//POST/api/v1/comments
commentRoutes.post("/", commentCtrl);
  
  //GET/api/v1/comments/:id
  commentRoutes.get("/:id",commentPostCtrl );
  
  //DELETE/api/v1/comments/:id
  commentRoutes.delete("/:id", commentDeleteCtrl);
  
  //PUT/api/v1/comments/:id
  commentRoutes.put("/:id", commentUpdateCtrl);

module.exports = commentRoutes;