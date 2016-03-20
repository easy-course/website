var express = require('express'),
	bodyParser = require('body-parser'),
    form = require('express-form'),
    field = form.field;
var app = express();
 
var hbs = require('hbs');
 
var blogEngine = require('./call_personne');
 
 
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
 
app.get('/', function(req, res) {
    res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});

app.get('/inscription', 
		form(
			//field("username").trim().required().is(/^[a-z]+$/),
			//field("password").trim().required().is(/^[0-9]+$/),
			//field("email").trim().isEmail()
		   ),
		function(req, res) {
			res.render('inscription', {title:"About Me"});
			if (!req.form.isValid) {
			   // Handle errors 
			   console.log(req.form.errors);
		 
			} 
			else if(req.query['username'] != 'undefined') 
			{
			   console.log('Pseudo: ' + req.query['pseudo']);
			   console.log('Email: ' + req.query['email']);
			   console.log('Ville: ' + req.query['city']);
			   console.log('Code Postal: ' + req.query['postal']);
			   console.log('Competence: ' + req.query['skill']);
			   console.log('Description: ' + req.query['description']);
			}
});


app.get('/inscription.html/:p1', function(request, response) {
  var p1 = request.params.p1; 
  console.log(p1);
  response.sendFile( __dirname  + '/inscription.html');
});


app.get('/page', function(req, res) {
    res.render('page', {title:"page"});
});

 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});
 
app.get('/personne/:id', function(req, res) { //lien
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('personne',{title:entry.title, blog:entry}); //personne.html
});
 
app.listen(3000);