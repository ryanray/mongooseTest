
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , kittens = require('./routes/kittens.js')
  , http = require('http')
  , path = require('path');







var db = require('./lib/db.js');

//new kittens are created every time you start up app.js
var sleepy = new db.Kitten({name: 'Sleepy'});
var fluffy = new db.Kitten({name: 'Fluffy '});

//Sleepy exists in the node server's memory at this point
console.log(sleepy.name);

//Save fluffy to db - should be able to see fluffy from the mongo shell after this runs
fluffy.save(function(err, fluffy){
  if(err){
    console.log('THERE WAS AN ERROR!', err);
  }
  //call method that was added to the kittySchema in ./lib/db.js
  fluffy.speak();
});

// .find() gets all documents in the Kitten collection and passes them in as the 2nd
// argument in the callback( e.g. kittens, in this case )
db.Kitten.find(function(err, kittens){
  if(err){
    console.log('THERE WAS AN ERROR!', err);
  }
  console.log(kittens);
  //Note: We never call .save() on Sleepy so he never appears in the kitten list
});







//express related stuff

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/kittens', kittens.index);

//Handle all POST requests - POST, PUT, DELETE 
app.post('/kittens', kittens.postHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
