var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var os = require('os');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'formidable Demo' });
});

router.post('/upload',function(req,res){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.maxFieldSize = 2 * 1024 * 1024;
  form.keepExtensions= true;
  form.uploadDir = "./public/upload/";

  form.parse(req,function(err,fields,files){
    //you can get all fields value in form
    console.log(fields);

    //rename files
    var sourceFile = files.upload.path;
    var targetFile = path.join(form.uploadDir,files.upload.name);
    //check there is no duplicate files, and modify the file name
    fs.exists(targetFile,function(exists){
      if(exists){
        //modify file name
      }
      fs.renameSync(sourceFile,targetFile);
      res.send(targetFile);
    });
  });
});

module.exports = router;
