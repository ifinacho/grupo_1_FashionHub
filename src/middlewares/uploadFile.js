const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, '../../public/img/productos')); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `IMG_${Date.now()}_${file.originalname}`);  } 
  })

const uploadFile = multer({ storage });

module.exports = uploadFile