const mongoose = require("mongoose");

//gallery schema
const GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//gallery model
const Gallery = mongoose.model("Gallery", GallerySchema);

//export gallery model
module.exports = Gallery;
