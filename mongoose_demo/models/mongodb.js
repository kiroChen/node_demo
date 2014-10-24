var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_test');

//Emitted when an error occurs on this connection.
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

//Emitted after we connected and onOpen is executed on all of this connections models.
db.once('open',function(){
  console.log('database connect success');
});

//Emitted after we disconnected and onClose executed on all of this connections models.
db.on('close',function(){
  console.log('database connect close');
});

//or via createConnection(host,database,port)
//mongoose.createConnection('localhost','db_test')

exports.mongoose = mongoose;