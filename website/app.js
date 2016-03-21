var express = require('express'),
	bodyParser = require('body-parser'),
    form = require('express-form'),
    field = form.field,
    fs = require("fs"),
    hbs = require('hbs');
var blogEngine = require('./call_personne');
	


var app = express('./call_personne');
var json = fs.readFileSync("personnes.json", "UTF-8");
var parsed = JSON.parse(json);
 
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
 
 
app.get('/', function(req, res) {
    res.render('index',{entries:blogEngine.getBlogEntries()});
});


app.get('/inscription', 
		form(
			field("search").trim()
		),
		function(req, res) {
			res.render('inscription', {title:"About Me"});
			if (!req.form.isValid) {
			   // Handle errors 
			   console.log(req.form.errors);
		 
			} 
			else if(req.query['search'] != null && req.query['search'] != '')
			{
				console.log('Recherche: ' + req.query['search']);
			}
});
app.post('/inscription',
  form(
    field("pseudo").trim().required().is(/^[a-z]+$/),
    field("city").trim().required().isAlphanumeric(),
	field("postal").trim().required().is(/^[0-9]+$/),
    field("email").trim().isEmail(),
	field("skill").trim(),
	field("description").trim()
   ),
   function(req, res){
     if (!req.form.isValid) {
       // Handle errors 
       console.log(req.form.errors); 
     } else {
				var entries = [];
				for(var x in parsed)
					entries.push(parsed[x]);
				entries.push({
					id: entries.length + 1,
					pseudo: req.form.pseudo,
					email: req.form.email,
					ville: req.form.city,
					postal: req.form.postal,
					competence: req.form.skill,
					description: req.form.description
				});
				fs.writeFile('personnes.json', JSON.stringify(entries, null, 4), function(err)
				{
					if(err) {console.log(err);}
				});
     }
  }
);

app.get('/inscription.html/:p1', function(request, response) {
	var p1 = request.params.p1; 
	console.log(p1);
	response.sendFile( __dirname  + '/inscription.html');
});


app.get('/page', function(req, res) {
    res.render('page', {title:"page"});
});
 
app.get('/personne/:id', function(req, res) { //lien
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('personne',{title:entry.title, blog:entry}); //personne.html
});
 
app.listen(3000);