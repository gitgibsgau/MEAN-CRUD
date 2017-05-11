
var userSchema = require('./model/userSchema');

	
exports.signup = function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
		
	var newUser = new userSchema({

		username : username,
		password : password		
	});

	newUser.save(function(err) {
		var json_responses;
		if (err) {
			console.log(err);
			json_responses = { "status" : 400};
		}

		else {
			console.log('New User created!');

			json_responses = {"status" : 200};

		}
		res.send(json_responses);
	});
}