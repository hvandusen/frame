function to_json(input,search){
  var obj = {
    parent: null,
    children: []
  };
  var lines = input.split("\n");
  lines.splice(0,5)
  lines = lines.filter(function(e,i){
    if(e==="" || e.indexOf("Sense")>-1)
      return false;
    else
      return true;
  });
  var counter = 0;
  while(counter<lines.length){
    parseLine(lines);
  }

  return obj
}

function toArray(input,search){

  console.log(input,search  )
}

var regex = new RegExp('ab+c', 'i');

function over(input){
 var lines = input.split("\n")
 // lines.splice(0,0)
 var output = {};
 var current_part = "";
 for(var i=0;i<lines.length;i++){
  var line = lines[i];
  if(line.indexOf("The ")===0){
    current_part = line.split(" ")[1];
    output[current_part] = [];
  }
  else if(line.search(/^\s*$/)>-1 || line.indexOf("Overview of ")===0){ //empty or all space
  }
  else {
    output[current_part].push(line);
    console.log(line);
    line = line.replace(/^/);
    console.log(line);
  }
 }
 return output
}

module.exports = {
  toArray: toArray,
  to_json: to_json,
  over: over
};

function getTabs(input){
  var tabCount = 0;
  while(input[tabCount] === " ")
   tabCount++;
  if(tabCount>0)
    tabCount = tabCount/7;
  return tabCount;
}
