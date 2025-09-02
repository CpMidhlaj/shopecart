const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let fileDestination;
    if(file.fieldname === "userPhoto"){
      fileDestination = "./uploads/userPhoto";
    }else{
      fileDestination = "./uploads/productPhotos"
    }
    cb(null, fileDestination)
  },
  filename: function (req, file, cb) {
    console.log("file----->",file.originalname);
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,  uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage })
module.exports = upload