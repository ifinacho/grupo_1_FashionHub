const multer = require("multer");

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, '/img/productos'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${file.originalname}`);  } 
  })

const uploadFile = multer({ storage });

module.exports = uploadFile