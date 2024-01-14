//import {v2 as cloudinary} from 'cloudinary';
 
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
cloudinary.config({ 
  cloud_name: 'dzgd4lxil', 
  api_key: '492414635798495', 
  api_secret: 'TOUuojtBOSCpaDTRSjWinl3OSgM' 
});


//instance of clodinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    
    allowedFormats: ['jpeg', 'png', 'jpg'],
    params: {
        folder: 'nodejs',
        transformation: [{ width: 500, height: 500, crop: 'limit' }], 
    },
}); 

module.exports = {
    cloudinary,
    storage
}