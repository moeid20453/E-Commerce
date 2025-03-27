const multer = require("multer");
// Configure memory storage

const storage = multer.memoryStorage();

// File filter to validate file types and ensure temporary storage
const fileFilter = (req, file, cb) => {
  // Allow common file types that might need cloud storage
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    // Add timestamp to track file age in memory
    file.uploadedAt = Date.now();
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Please upload valid document or image files."
      ),
      false
    );
  }
};

// Configure multer with memory storage and constraints
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
    files: 3, // Maximum 3 files per request
  },
  fileFilter: fileFilter,
});

// Middleware to check file age and clean memory
const cleanupMiddleware = (req, res, next) => {
  if (req.file && Date.now() - req.file.uploadedAt > 5 * 60 * 1000) {
    // 5 minutes
    delete req.file; // Remove from memory if too old
  }
  next();
};

// Export middleware configurations
module.exports = {
  single: [upload.single("file"), cleanupMiddleware], // For single file
  array: [upload.array("files", 3), cleanupMiddleware], // For multiple files
  upload: upload, // Raw multer instance
};
