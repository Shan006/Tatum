const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const imagesRouter = require('./routes/images');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Image-related routes
app.use('/api', imagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
