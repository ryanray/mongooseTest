// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log('CONNECTION OPEN!');
});

var kittySchema = mongoose.Schema({
    name: String,
    isComplete: { type: Boolean, default: false }
})

kittySchema.methods.speak = function(){
	var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
	console.log(greeting);
};

exports.db = db;
exports.Kitten =  mongoose.model('Kitten', kittySchema);