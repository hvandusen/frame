var wordnet = require(__dirname+"/wn.js");
var wn = wordnet.wn;
var stdin = process.openStdin();
var flags = ["over"]
var flag_choices = ["h", "g", "a", "o", "s", "l", "n#", "over", "syns", "simsv", "ants", "faml", "hyp", "hyp", "tre", "coo", "de","dom", "dom",
"subsn", "partn", "membn", "meron", "hmern", "sprtn", "smemn", "ssubn", "holon", "hholn", "entav","framv", "causv", "pert", "attr",
"grep"];

stdin.addListener("data", function(d) {
  if(d.toString() === "options\n"){
    console.log(flag_choices.join("\n"))
    return;
  }
  if(flag_choices.indexOf(d.toString().replace("\n",""))> -1){
    flags = [d.toString().replace("\n","")];
    return;
  }
  wn(d.toString().trim(),flags).then(function(items){
    console.log(items)
  });
});
