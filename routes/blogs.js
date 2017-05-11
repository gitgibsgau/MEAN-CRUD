

var blogSchema = require('./model/blogSchema');
//var mongoURL = "mongodb://localhost:27017/blogs";



	exports.blogs = function(req,res){
		// These two variables come from the form on
		// the views/login.hbs page
		var title = req.param("title");
		var content = req.param("content");
		var owner = req.session.username;
		var json_responses;

		var newBlog = new blogSchema({

			title : title,
			content : content,
			owner : owner
		});

		newBlog.save(function(err) {
			var json_responses;
			if (err) {
				console.log(err);
				json_responses = { "status" : 400};
			}

			else {
				console.log(title+" "+content+" "+owner);
				console.log('New Blog!');
				json_responses = {"status" : 200};

			}
			res.send(json_responses);
		});
	}
		

exports.getEmail = function(req, res){
	var username = req.session.username;
	console.log(username);
	var json_response;
	json_response = {"status" : 200, "username" : username};
	res.send(json_response);

}

exports.redirectToDashboard = function(req,res){
	console.log(req.param("username"));
	var json_resposne = {"status":200};

	//res.render();
	res.send(json_resposne);
}
exports.dashboard = function(req, res){

	res.render("dashboard",{"username" : req.session.username });
}
exports.blogList = function(req, res){
	var owner = req.param("owner");
	console.log("yes baby"+owner);
	//blogSchema.find({owner:owner});
	blogSchema.find({owner : owner}, function(err, result){



		var json_responses;
		if (err) {
			console.log(err);
			json_responses = { "status" : 400};
		}

		else {
			if(result)
			{
				console.log(result);
				json_responses = {"status" : 200, "data" : result};
				res.send(json_responses);
			}
			else{
				console.log("NULL");
				json_responses = {"status" : 300};
			}
		}

	});

}
