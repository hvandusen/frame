//wn dog -treen
var command = "wn dog -treen";
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function wn(term,args){
  let myFirstPromise = new Promise((resolve, reject) => {
    var flags = (args.length>1 ? "-"+args.join(" -") : "-"+args[0]);
      execute("wn " + term +" "+flags,function(item){
        resolve(item);
      })
  });
  return myFirstPromise;
}

module.exports = {
  wn: wn
}
