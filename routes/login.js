
var userSchema = require('./model/userSchema');

//var Users = new userSchema();
		
	exports.checkLogin = function(req, res) {
		
		
		var username = req.param('username');
		var password = req.param('password');
		
		console.log("Values : "+username+" "+password);
		userSchema.findOne({username : username, password : password}, function(err, users){
			
			

			var json_responses;
				if (err) {
					console.log(err);
					json_responses = { "status" : 400};
				}

				else {
					if(users)
						{
							req.session.username = username;
							console.log('Login successful');
							json_responses = {"status" : 200};
							res.send(json_responses);
						}
					else{
							console.log("NULL");
							json_responses = {"status" : 300};
						}
					}
					
		});
	};



exports.redirectToSignedUser = function(req,res)
{
	//Checks before redirecting whether the session is valid
		res.render("signedUser");
};

//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

