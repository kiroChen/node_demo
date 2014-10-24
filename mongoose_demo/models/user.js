var mongodb = require('./mongodb');

var Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({
  name:String,
  email:String,
  mobile:String,
  create_data:{type:Date,default:Date.now}
});

//model
var User = mongodb.mongoose.model('User',userSchema);

var UserDAO = function(){};

//save user
UserDAO.prototype.save = function(obj,callback) {
  // body...
  var instance = new User(obj);

  instance.save(function(err){
    callback(err);
  });
};

//update user
UserDAO.prototype.findByIdAndUpdate = function(obj,callback) {
  // body...
  var _id=obj._id;
  delete obj._id;
  User.findOneAndUpdate(_id, obj, function(err,obj){
    callback(err, obj);
  });

};

//find one
UserDAO.prototype.findOne = function(callback){
  //body...
  User.findOne({},function(err,obj){
    callback(err,obj);
  });
};

//find user by name
UserDAO.prototype.findByName = function(name,callback) {
  // body...
  User.findOne({name:name}, function(err, obj){
    callback(err, obj);
  });
};

module.exports = new UserDAO();
