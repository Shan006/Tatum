const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the folder based on the category sent in the request
    const category = req.body.category; // Assuming category is sent in the request body
    let uploadPath = '';

    if (category === 'background') {
      uploadPath = path.join(__dirname, '../public/utils/backgrounds');
    } else if (category === 'body') {
      uploadPath = path.join(__dirname, '../public/utils/bodies');
    } else if (category === 'cap') {
      uploadPath = path.join(__dirname, '../public/utils/caps');
    }

    // Set the upload path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Set the filename to be the original name of the uploaded file
    cb(null, file.originalname);
  },
});

// Set up multer with the storage configuration
const upload = multer({ storage: storage });

// Function to get image names from a specific folder
const getImageNames = (folderPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.map(file => path.parse(file).name));
        }
      });
    });
  };

  // POST route for handling file uploads
router.post('/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Image uploaded successfully!' });
  });

  // GET route to fetch image names for all categories
router.get('/images', async (req, res) => {
    const utilsPath = path.join(__dirname, '../public/utils');
    try {
      const backgroundsPath = path.join(utilsPath, 'backgrounds');
      const bodiesPath = path.join(utilsPath, 'bodies');
      const capsPath = path.join(utilsPath, 'caps');
  
      const [backgrounds, bodies, caps] = await Promise.all([
        getImageNames(backgroundsPath),
        getImageNames(bodiesPath),
        getImageNames(capsPath)
      ]);
  
      res.json({
        backgrounds: backgrounds,
        bodies: bodies,
        caps: caps
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  });

module.exports = router;
