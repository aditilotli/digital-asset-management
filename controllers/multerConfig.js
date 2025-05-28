// Configure multer for file upload
const multer = require('multer');
const path = require('path');
const contextPath = process.cwd();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let filePath = path.join(contextPath, 'uploads')
    cb(null, filePath); // Make sure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB file size limit
  },
  fileFilter: function(req, file, cb) {
    // Allow images, PDFs and videos
    const allowedTypes = /jpeg|jpg|png|gif|pdf|mp4|mov|avi|wmv|flv|mkv|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only images, PDFs and videos are allowed!');
    }
  }
});

module.exports = multerUpload;