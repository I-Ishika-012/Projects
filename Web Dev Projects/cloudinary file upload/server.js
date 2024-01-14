const express = require("express");
const app = express();
const storage = require("./config/cloudinary");
const multer = require("multer");
const Gallery = require("./model/Gallery");
const connectDB = require("./config/dbConnect");
connectDB();


//veiw engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//!configuring multer
const upload = multer({ storage: storage });
/*const upload =  multer({
  dest: '/public/images',
  limits : { 
    fileSize: 1000000 //? 1 MB
  },
  fileFilter(req, file, cb) {
    //!to accept only images
    //?success
    if(file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.png')){
      return cb(null, true); //?no errpr--proceed with upload/next step
    }
    //?failure
    else{
      return cb(new Error('Please upload an image'), false);
    }
    //if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //return cb(new Error('Please upload an image'));
    //}
    cb(undefined, true);
  }
});*/

//GET /
app.get("/", (req, res) => {
  res.render("home");
});

//GET/ upload
app.get("/upload", (req, res) => {
  res.render("upload");
});
//POST /upload
app.post("/upload", upload.single("file"),  async (req, res) => {
  const file = req.file.path;

  try {
    const pic = await Gallery.create({ name: file });
    console.log(pic);
    res.render("images");
  } catch (error) {
    res.send("Something went wrong");
  }
});

//GET /images
app.get("/images", async (req, res) => {
  //read all files in the uploads folder
  try {
    const images = await Gallery.find();
    console.log(images);
    res.render("images", { images });
  } catch (error) {
    res.send("Something went wrong");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
