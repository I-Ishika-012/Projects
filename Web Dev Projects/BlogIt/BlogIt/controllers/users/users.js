const bcrypt = require("bcrypt");
const User = require("../../models/user/user");
const appErr = require("../../utils/appErr");


//REGISTER
const registerCtrl = async (req, res, next) => {
  const { fullname, email, password } = req.body;  
  //!check if fields are empty
  if (!fullname || !email || !password) {
    //return next(appErr("All fields are required", 400));
    return res.render("users/register", { error: "All fields are required" });
  }
  try {
      //!check if user exists 
      const userFound = await User.findOne({ email });
      //throw error if user exists
      if (userFound) {
        // return next(appErr("User already exists", 400));
        return res.render("users/register", {
          error: "User already exists",
        })
        }
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //register user
      const user = await User.create({  
        fullname, 
        email, 
        password: hashedPassword });
        //redirect to profile page
        res.redirect("/api/v1/users/profile-page");
      } catch (error) {
        res.json(error);
      };
    };  

    //LOGIN
    const loginCtrl = async (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password) {
        // return next(appErr("Email and password fields are required"));
        return res.render("users/login", { error: "All fields are required" });
      }
      try {
        //Check if email exist
        const userFound = await User.findOne({ email });
        if (!userFound) {
          //throw an error
          // return next(appErr("Invalid login credentials"));
          return res.render("users/login", { error: "Invalid login credentials" });
        }
        //verify password
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
          //throw an error
          // return next(appErr("Invalid login credentials"));
          return res.render("users/login", { error: "Invalid login credentials" });
        }
        //save the user in the session
        req.session.userAuth = userFound._id;
        //redirect to profile page
        res.redirect("/api/v1/users/profile-page");
      } catch (error) {
        res.json(error);
      }
    };

const userDetailsCtrl = async (req, res) => {
    try {
      //!get userid from params- logged in user
      const userID = req.params.id;
      //! find the user
      const user = await User.findById(userID);
      if (!user) {
        return next(appErr("User not found", 404));
      }
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json(error);
    }
  };

const profileCtrl = async (req, res) => {
    try {
      //!get user profile - logged in user
      const userID = req.session.userAuth;
      //! find the user
      const user = await User.findById(userID)
      .populate("posts")
      .populate("comments");
      // if (!user) {
      //   return next(appErr("User not found", 404));
      // }
      // res.json({
      //   status: "success",
      //   data: user,
      // });
      res.render("users/profile",
       {
        user,
      })
        } catch (error) {
      res.json(error);
        }
      };

  

const profilePhotoUploadCtrl =  async (req, res, next) => {
    try {
      //find user
      const userId = req.session.userAuth;
      const userFound = await User.findById(userId);
      //if usr is not found
      if (!userFound) {
        return next(appErr("User not found", 404));
      }
      //update user profile image
      await User.findByIdAndUpdate(userId, {
        profileImage: req.file.path,
      },
      {
        new: true ,
      });
      res.json({
        status: "success",
        data: "User profile image uploaded successfully",
      });
    } catch (error) {
      return next(appErr(error.message, 400));
    }
  };

  const coverPhotoUploadCtrl = async (req, res, next) => {
    try {
      //find user
      const userId = req.session.userAuth;
      const userFound = await User.findById(userId);
      //if usr is not found
      if (!userFound) {
        return next(appErr("User not found", 404));
      }
      //update user cover image
      await User.findByIdAndUpdate(userId, {
        coverImage: req.file.path,
      },
      {
        new: true,
      });
      res.json({
        status: "success",
        user: "User cover image uploaded successfully",
      });
    } catch (error) {
      return next(appErr(error.message, 400));
    }
  };

  const updatePasswordCtrl = async (req, res, next) => {
    const {password} = req.body;
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //update user
        await User.findByIdAndUpdate(req.params.id, {
        password: hashedPassword,
        },
        {
        new: true ,
        });
      res.json({
        status: "success",
        user: "User password updated",
      })
      }
    } catch (error) {
      return next(appErr(error.message, 400));
    }
  }

const updateUserCtrl =  async (req, res, next) => {
  const { fullname, email} = req.body;  
  try {
    //!check if the email is already in use
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email already in use", 400));
      }
    }
    //!update user
    const user = await User.findByIdAndUpdate(req.params.id, {
      fullname,
      email,
    }, { 
      new: true ,
    });
    //!save the user in the session
    req.session.userAuth = user._id;
    //!send response
      res.json({
        status: "success",
        data: user,
      })
    } catch (error) {
      return next(appErr(error.message, 400));
    }
}

const logoutCtrl =  async (req, res) => {
    try {
      // res.json({
      //   status: "success",
      //   user: "User logout",
      // });
      //destroy the session
      req.session.destroy(()=>{
        res.redirect("/api/v1/users/login");
      });
    } catch (error) {
      res.json(error);
    }
  }

module.exports = {
  registerCtrl, 
  loginCtrl, 
  userDetailsCtrl, 
  profileCtrl, 
  profilePhotoUploadCtrl, 
  coverPhotoUploadCtrl, 
  updatePasswordCtrl, 
  updateUserCtrl,
  logoutCtrl};
