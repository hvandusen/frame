var wnClass = require("node-wordnet");
var fs = require("fs")
var wn = new wnClass();
var words = fs.readFileSync('words.txt', "utf8").split('\n');
Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)]
}

let tangent = [];
let wordGroup = words;
async function stream(count=10){
  let search = await randomRelatedWord(wordGroup,20);
  tangent.push(search.word);
  wordGroup = search.relatedWords;
  if(count>0)
    return stream(count-1)
  else {
    return arrayUnique(tangent);
  }

  async function randomRelatedWord(words=words,ensureCount = 0){
    let wordChoice = words.random();
    var t = await wn.lookupAsync(wordChoice).then(getTangents);
    while(t.length <= ensureCount){
      wordChoice = words.random();
      t = await wn.lookupAsync(wordChoice).then(getTangents);
    }
    return {word: wordChoice,
    relatedWords: t}
  }

  function getTangents(entries){
    let tangents = [];
    entries.map(entry => {
      tangents.push(entry.lemma);
      tangents = tangents.concat(entry.synonyms)
      .concat(extractGoodWords(entry.def))
      .concat(extractGoodWords(entry.gloss));
      tangents = tangents.map(e => strip(e)).sort()
    })
    return arrayUnique(tangents);

    function extractGoodWords(string){
      var choices = string.split(" ");
      choices = choices.filter((w)=>{
        return w.length>3 && ["of","a","to","from","the","for","with","because","than"].indexOf(w)<0;
      });
      return arrayUnique(choices)
    }

    function strip(string){
      return string.replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    }
  }

  function arrayUnique(arr){
    return arr.filter(function(item, index){
      return arr.indexOf(item) >= index;
    });
  }
}

// stream(100).then(e => console.log(e.join(",")))

module.exports = stream;
