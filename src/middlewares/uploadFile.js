const multer = require("multer");
const path = require("path");

const getUploadDestination = (req) =>{
   if (req.originalUrl.includes("/product")){
      return "productos";
   } else if (req.originalUrl.includes("/user")){
      return "usuarios"
   }
}
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
      const basePath = path.join(__dirname, '../../public/img/'); 
      const destination = getUploadDestination(req);
      const destPath = path.join(basePath, destination);
       cb(null, destPath); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `IMG_${Date.now()}_${file.originalname}`);  } 
  })

const uploadFile = multer({ storage });

module.exports = uploadFile