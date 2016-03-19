var express = require('express');
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

app.get('/inscription', function(req, res) {
    res.render('inscription', {title:"About Me"});
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