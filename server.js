var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
	requireAuthentication: function(req, res, next){
		console.log('private route hit!');
		next();
	},
	logger: function(req, res, next){
		console.log('Request: '+ new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

app.use(middleware.requireAuthentication);
app.use(middleware.logger);

console.log('Server starting... ');
app.get('/about', middleware.requireAuthentication, function(req, res){
	res.send('This is an Express server!');
});

app.use(express.static(__dirname + '/public'))

app.listen(PORT, function(){
	console.log('Express server started on port ' + PORT);
});