

var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/users');
var db = mongoose.connection;


db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);


var blogData= new Schema({
        blogId : {
            type : String
        },
        title : String,
        content : String,
        owner : String
    },
    {
        _id : true
    });

var blogs = mongoose.model('blogs', blogData);
blogData.plugin(autoIncrement.plugin, {
    model: 'blogs',
    field: 'blogId',
    startAt: 1,
    incrementBy: 1
});

module.exports = blogs;