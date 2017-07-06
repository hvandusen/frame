//wn dog -treen
var command = "wn dog -treen";
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function getSenses(term){
  let myFirstPromise = new Promise((resolve, reject) => {
    // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
    // In this example, we use setTimeout(...) to simulate async code.
    // In reality, you will probably be using something like XHR or an HTML5 API.
      execute("wn " + term + " -over",function(item){
        // console.log(item)
        resolve(item);
      })
  });

  return myFirstPromise;
  // myFirstPromise.then((successMessage) => {
  //   // successMessage is whatever we passed in the resolve(...) function above.
  //   // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  //   console.log("Yay! " + successMessage);
  // });
}
getSenses("fun").then(function(items){
  console.log(items.split("\n").splice(3));
});
