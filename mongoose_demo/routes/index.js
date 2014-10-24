var express = require('express');
var router = express.Router();
var async = require('async');
var userModel = require('../models/user.js');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//add user to db
router.get('/save',function(req,res){
  
  var obj_user = {
    name:"kiro.chen",
    email:"330558685@qq.com",
    mobile:"15986******"
  };

  userModel.save(obj_user,function(err){
    if(err){
      res.send({'success':false,'err':err});
    }else{
      res.send({'success':true});
    }
  });

});

//find one user from db
router.get('/findOne',function(req,res){
  userModel.findOne(function(err,obj){
    if(err){
      return res.send({'success':false,'err':err});
    }else{
      res.send({'user':obj});
    }
  });
});

//find one by name
router.get('/findByName',function(req,res){
  async.waterfall([
    function(callback){
      userModel.findOne(function(err,obj){
        callback(err,obj);
      });
    },
    function(obj,callback){
      var name = obj.name;
      userModel.findByName(name,function(err,obj){
        callback(err,obj);
      });
    }
  ],function(err,obj){
    if(err){
      res.send({'success':false,'err':err});
    }else{
      res.send({'success':true,'user':obj});
    }
  });
});

//findByIdAndUpdate
router.get('/findByIdAndUpdate',function(req,res){
  async.waterfall([
    function(callback){
      userModel.findOne(function(err,obj){
        callback(err,obj);
      });
    },

    function(obj,callback){
      obj.name = "kiro.chen";
      userModel.findByIdAndUpdate(obj,function(err,obj){
        callback(err,obj);
      });
    }
  ],function(err,obj){
    if(err){
      res.send({'success':false,'err':err});
    }else{
      res.send({'success':true,'user':obj});
    }
  });
});


module.exports = router;
