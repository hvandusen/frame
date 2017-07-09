function wn_to_json(input){
  var obj = {
    parent: null,
    val: null
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
  //lines.forEach(function(e,i){
    //var tabCount = getTabs(e);
  //});
  var counter = 0;
  while(counter<lines.length){
    parseLine(lines);
  }

  return obj

  function parseLine(obj,lines,count,tabs){
    
    if(lines[count].getTabs()>tabs)


  }
}

module.exports = wn_to_json;

function getTabs(input){
  var tabCount = 0;
  while(input[tabCount] === " ")
   tabCount++;
  if(tabCount>0)
    tabCount = tabCount/7;
  return tabCount;
}
