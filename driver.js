var WordSearcher = require("./WordSearcher")
var wn = new WordSearcher();
wn.trainOfThought(process.argv[2],15);
// wn.lookup(process.argv[2]).then((e)=>{
//   console.log(e)
// })
