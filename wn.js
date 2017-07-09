//wn dog -treen
var command = "wn dog -treen";
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function wn(term,args){
  let myFirstPromise = new Promise((resolve, reject) => {
    if(typeof args === "string"){
      args = [args]
    }
    var flags = (args.length>1 ? args.join(" -") : "-"+args[0]);
    console.log("executing "+"wn " + term +" "+flags)
      execute("wn " + term +" "+flags,function(item){
        resolve(item);
      })
  });
  return myFirstPromise;
}

module.exports = {
  wn: wn
}
