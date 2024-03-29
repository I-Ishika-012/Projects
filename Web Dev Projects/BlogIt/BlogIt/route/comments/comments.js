const express = require("express");
const commentRoutes = express.Router();
const { commentCtrl, commentPostCtrl, commentDeleteCtrl, commentUpdateCtrl } = require("../../controllers/comments/comments");
const protected = require("../../middlewares/protected");

//POST/api/v1/comments
commentRoutes.post("/:id", protected, commentCtrl);
  
  //GET/api/v1/comments/:id
  commentRoutes.get("/:id",commentPostCtrl );
  
  //DELETE/api/v1/comments/:id
  commentRoutes.delete("/:id", protected, commentDeleteCtrl);
  
  //PUT/api/v1/comments/:id
  commentRoutes.put("/:id", commentUpdateCtrl);

module.exports = commentRoutes;
