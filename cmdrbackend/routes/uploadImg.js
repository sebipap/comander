const router = require("express").Router();
var path = require('path');


router.post('/upload', (req, res) => {
    let sampleFile;
    let uploadPath;

    console.log(req.files)
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({message: 'No files were uploaded.'});
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    
    const fileName = req.body.name + sampleFile.name
    uploadPath = path.join(__dirname,"..","public", "images", fileName)  
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err) return //res.status(500).send({message: err});
  
      res.send({message: 'Imagen Subida'});
    });
  });
module.exports = router;
