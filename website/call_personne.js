//fs.writeFileSync("personnes", "contenu du fichier", "UTF-8");

var fs = require("fs");
var json = fs.readFileSync("personnes.json", "UTF-8");
//json = require('personnes.json');

var parsed = JSON.parse(json);

var entries = [];
for(var x in parsed)
	entries.push(parsed[x]);

entries.push(
    {pseudo: "XX", email: "XX", ville: "XX", longitude: "XX", latitude: "XX", competence: [{ domaine: "XX", specialite: "XX" }]        }
);


fs.writeFile('personnes.json', JSON.stringify(entries, null, 4), function(err)
			{
				if(err) {console.log(err);}
				
			});

 
exports.getBlogEntries = function() {
    return entries;
}
 
exports.getBlogEntry = function(id) {
    for(var i=0; i < entries.length; i++) {
        if(entries[i].id == id) return entries[i];
    }
}