var fs = require("fs");
var json = fs.readFileSync("personnes.json", "UTF-8");
var parsed = JSON.parse(json);

var entries = [];
for(var x in parsed)
	entries.push(parsed[x]);
 
exports.getBlogEntries = function() {
    return entries;
}
 
exports.getBlogEntry = function(id) {
    for(var i=0; i < entries.length; i++) {
        if(entries[i].id == id) return entries[i];
    }
}