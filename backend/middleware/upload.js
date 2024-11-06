const cloudinary = require("../utils/cloudinary");
exports.uploadImageFile = async (req, res, next) => {
    try {
    const imgURL="https://via.placeholder.com/150/000000/FFFFFF/?text=Profile"
    if(req.files && req.files.photo){
      const file = req.files.photo;
        
      await cloudinary.uploader.upload(file.tempFilePath, { folder: 'profile_pics' }, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error uploading to Cloudinary"
          });
        }
        const imgURL=result.url;
        req.imgURL=imgURL;
      });
    }
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }finally{
        next();
    }
  };
