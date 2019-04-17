var wnClass = require("node-wordnet");
var fs = require("fs");

class WordSearcher {
  constructor(){
    this.wn = new wnClass();
    this.lookups= [];
    this.masterList = [];
    this.train = [];
    this.promises = []
  }

  lookup(word){
    let tangents = [];
    return new Promise((res,rej)=>{
      this.wn.lookup(word,(err,e)=>{
        if(err){
          rej(err)
        }
        else {
          this.lookups.push(word);
          res(e)
        }
      })
    })
  }
  async tangents(word="nuts",offset = 0) {
    const pageSize = 3;
    const sentence = [...'hello world'];
    let words = await this.lookup(word);
    words = words.map( e => this.getTangents(e)).join();
    return words.length ? words : undefined;
  };
  formatEntry(entry){
    const fields = ["lemma","synonyms","def","gloss"];
    let out = {};
    for(var i in entry){
      if(fields.indexOf(i)>-1)
        out[i] = entry[i]
    }
    return out;
  }
  getTangents(entry){
    let tangents = [];
      tangents.push(entry.lemma);
      tangents = tangents.concat(entry.synonyms)
      .concat(this.extractGoodWords(entry.def))
      .concat(this.extractGoodWords(entry.gloss));
      tangents = tangents.map(e => this.strip(e))
    return tangents;
  }
  trainOfThought(word,amount){
    this.tangent(process.argv[2],15).then(()=>{
      console.log("shit")
    });

    Promise.all(this.promises).then((ya)=>{
    })
    return this.train;

  }
  strip(string){
    return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  }
  tangent(string,count){
    return new Promise((res,rej)=>{
      string = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      let counter = count
      let tangents = [];
      this.lookup(string).then((results) =>{
        results.map((entry)=>{
          tangents = tangents.concat(this.getTangents(entry).filter((word)=>{
            return word !== string && this.lookups.indexOf(word)<0;
          }));
        });
        let next = tangents[Math.floor(Math.random()*tangents.length)];
        if(tangents.length === 0 || next === undefined){
          this.lookups.pop();
          let newTangents = this.masterList[this.masterList.length-1].tangents;
          let next = newTangents[Math.floor(Math.random()*newTangents.length)];
          this.tangent(this.lookups[this.lookups.length-1],counter)
          rej();
        }
        else if(this.lookups.indexOf(next)>-1){
          console.log("well already had that")
          next = tangents[Math.floor(Math.random()*tangents.length)];
          // console.log(count,") ",string,": tangents: ",tangents)
          this.tangent(next,counter)
          rej();
        }
        else if(0<counter){
          let next = tangents[Math.floor(Math.random()*tangents.length)].replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          this.masterList.push({string: string,tangents: tangents})
          this.promises.push(this.tangent(next,counter-1));
          console.log(next)
          if(counter === 1)
          res(next);
        }
      })
    })
  }
  extractGoodWords(string){
    var choices = string.split(" ");
    choices = choices.filter((w)=>{
      return w.length>3 && ["of","a","to","from","the","for"].indexOf(w)<0 ;
    })
    return choices
  }

}

module.exports = WordSearcher;

// var search = new WordSearcher();
// search.lookup("basketball")
