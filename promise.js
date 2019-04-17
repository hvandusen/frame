//good shit https://blog.scottlogic.com/2017/09/14/asynchronous-recursion.html
const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));
var WordSearcher = require("./WordSearcher")
var wn = new WordSearcher();

const getSentenceFragment = async function(offset = 0) {
  let words = await wn.tangents("nuts");
  console.log(words)

};




const getSentence = async function(word="nuts",count = 10) {
  const fragment = await wn.tangents(word)
  let outy = "";
  let list = [word];
  let choice = word;
  let ctr = count;
  wn.tangents(choice).then(next => {
    console.log(next)
    if(next){
      next = next.split(",")
      do{
        choice = next[Math.floor(Math.random()*next.length)]
      } while(list.indexOf(choice)>-1)
      list.push(choice);
      ctr --;
    } else {

    }
  })

  console.log(list)


  // for (var i = 0; i < count; i++) {
  //   let next =  await wn.tangents(choice)
  //   next = next.split(",")
  //   // console.log("next",next)
  //   choice = next[Math.floor(Math.random()*next.length)]
  //   list.push(choice+" ");
  // }
  return list
}

getSentence("person")//.then(e => console.log(e))



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
