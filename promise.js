//good shit https://blog.scottlogic.com/2017/09/14/asynchronous-recursion.html
const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));
var WordSearcher = require("./WordSearcher")
var wn = new WordSearcher();

const streamFragment = async function(offset = 0) {
  let words = await wn.tangents("nuts");
  console.log(words)

};

const stream = async function(word="nuts",count = 10,list=[]) {
  let fragment = await wn.tangents(word);
  //let list = [word];
  let choice = word;
  if(count===-1)
    return list;
  if(fragment.words){
    do{
      fragment.data = [fragment.words[Math.floor(Math.random()*fragment.words.length)]]
    } while(list.indexOf(fragment.data)>-1);
    list.push(choice)
    count--
    return fragment.data.concat(await stream(choice,count))
  } else {
    return fragment.data.concat(await stream(choice,count))
  }
}

let listt = stream("ball",100).then(e => console.log(e))



// function slow(i){
//   return new Promise((res,rej)=>{
//     setTimeout(()=>{
//       res( "yah")
//     },i)
//   })
// }
//
// var list = [];
// function createList(){
//   for (var i = 0; i < 10; i++) {
//     list.push(new Promise((res,rej)=>{}));
//   }
// }
// async function go(){
//   createList();
//   console.log(list)
//   let y = await Promise.all(list)
//   console.log(y)
// }
//
// go();
