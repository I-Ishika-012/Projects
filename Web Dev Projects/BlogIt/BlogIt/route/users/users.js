const express = require("express");
const userRoutes = express.Router();
const storage = require("../../config/cloudinary");
const multer = require("multer");
const {
  registerCtrl,
  loginCtrl,
  userDetailsCtrl,
  profileCtrl,
  profilePhotoUploadCtrl,
  coverPhotoUploadCtrl,
  updatePasswordCtrl,
  updateUserCtrl,
  logoutCtrl,
} = require("../../controllers/users/users");
const protected = require("../../middlewares/protected");


//?instance of multer
const upload = multer({ storage });


//-----------------
//!RENDERING FORMS - USER SIDE
//-----------------

//?REGISTER
userRoutes.get("/register", (req, res) => {
  res.render("users/register", { error: "" });
})

//?LOGIN
userRoutes.get("/login", (req, res) => {
  res.render("users/login", { error: "" });
})

// //?PROFILE
// userRoutes.get("/profile-page", (req, res) => {
//   res.render("users/profile", { error: "" });
// })

//?PROFILE-PHOTO
userRoutes.get("/upload-profile-photo", (req, res) => {
  res.render("users/uploadProfilePhoto", { error: ""});
})

//?PROFILE-COVER
userRoutes.get("/upload-cover-photo", (req, res) => {
  res.render("users/uploadCoverImage", { error: ""});
})

//?UPDATE-USER
// userRoutes.get("/update-user", (req, res) => {
//   res.render("users/updateUser", { error: ""});
// })
//-----------------
//!API ROUTES
//-----------------

//register API
userRoutes.post("/register", upload.single("profile"), registerCtrl )

//login
userRoutes.post("/login", loginCtrl );

  //GET  profile/:id
  userRoutes.get("/profile-page", protected,  profileCtrl);
  
  //PUT /profile-photo-upload/:id
  userRoutes.put("/profile-photo-upload", protected, upload.single("profile"), profilePhotoUploadCtrl);
  
  //PUT /cover-photo-upload/:id
  userRoutes.put("/cover-photo-upload", protected, upload.single("cover"), coverPhotoUploadCtrl);
  
  //PUT/update-password/:id
  userRoutes.put("/update-password/:id", updatePasswordCtrl);

//GET/logout
userRoutes.get("/logout", logoutCtrl);

//GET :id
userRoutes.get("/:id", userDetailsCtrl );

//PUT/update/:id
userRoutes.put("/update", updateUserCtrl );
  

  
  

module.exports = userRoutes;
