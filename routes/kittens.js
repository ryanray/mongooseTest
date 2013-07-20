var db = require('../lib/db.js');


var displayAllTheKittens = function(req, res){
	db.Kitten.find(function(err, kittenResults){
	  if(err){
	    console.log('THERE WAS AN ERROR!', err);
	  }
	  console.log('KITEN RESULTS:', kittenResults);
	  // render kittens template and pass in find results as kittenList
	  res.render('kittens', { title: 'Kittens', kittenList: kittenResults });
	});
};


exports.index = function(req, res){
	displayAllTheKittens(req, res);
};

// since we aren't using ajax to submit the form we have to sniff out the desired
// method - POST, DELETE, PUT
exports.postHandler = function(req, res){
	var body = req.body;

	if(body.userAction === 'DELETE'){
		console.log('POST HANDLER | DELETE')
		exports.deleteKitten(req,res);
	}
	else if(body.userAction === 'PUT'){
		// NEED TO IMPLEMENT EDIT METHOD
		console.log('POST HANDLER | PUT')
		exports.editKitten(req,res);
	}
	// kittenName required to create kitten
	else if(body.kittenName){
		console.log('POST HANDLER | POST');
		exports.createKitten(req, res, body.kittenName);
	}
	else {
		// Didn't match any of our HTTP verbs or was missing kittenName 
		// so redirect to kitty list
		console.log('POST HANDLER | DEFAULT');
		res.redirect('/kittens');
	}
};

exports.editKitten = function(req, res){
	var newName = req.body.kittenName;
	var id = req.body.kittenId;
	var status = req.body.kittenIsComplete;
	//NEED TO IMPLEMENT
	if(!newName || !id){
		console.log('\n\n ERROR: newName & ID required');
		res.redirect('/kittens');
	}
	else {
		db.Kitten.findOneAndUpdate({_id: id}, {name: newName, isComplete: status}, function(){
			res.redirect('/kittens');
		});
	}

};

exports.createKitten = function(req, res, kittenName){
	db.Kitten.create({name: kittenName}, function(err, newKitten){
		if(err){
			console.log('\n\n\n ERROR CREATING KITTEN:: \n\n\n', err);
		}
		res.redirect('/kittens');
	});
};

exports.deleteKitten = function(req, res){
	var kittenId = req.body.kittenId;

	//find kitten by ID and remove it
	db.Kitten.remove({_id: kittenId}, function(err){
		if(err){
			console.log('\n\n\n ERROR REMOVING KITTEN:: \n\n\n', err);
		}
		else {
			console.log('\n\n\n KITTEN REMOVED \n\n\n');
		}
		//redirect to list after deleting kitten
		res.redirect('/kittens');
	});

}