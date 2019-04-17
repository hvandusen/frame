var express = require('express');
var router = express.Router();
var search;
var searchTerm = "node";
var WordNet = require('node-wordnet')
var wordnet = new WordNet()
wordnet.lookup("node", function(results) {
  // console.log(results)
  search = results;
});
/* GET users listing. */

router.get('/:term', function (request, response) {
  if(request.params.term){
    searchTerm = request.params.term;
    console.log(searchTerm)
    wordnet.lookup(searchTerm, function(results) {
      search = results;
      response.redirect("/wn");
    });
  };
  // res.redirect("/wn");

});

router.get('/syn/:offset', function(req,res){
  // res.send(search)
  wordnet.get(parseInt(req.params.offset),"n",function(results){
    console.log(results)
  })
  res.redirect("/wn");
});

router.get('/sns/:quer', function(req,res){
  var proms = [];
  // res.send(search)
  wordnet.querySense(req.params.quer+"#n",function(results){
    proms = results.map(function(i,e){
      return wordnet.findSenseAsync(i);
      // wordnet.findSense(i, console.log);
    });
    Promise.all(proms).then(function(val){
      console.log(val)
      res.render("senses",{title: req.params.quer, results: val});
    })
  });
});

router.get('/', function(req,res){
  // res.send(search)
  var send = {};
  if(req.query.search){
    res.redirect("/wn/"+req.query.search)
  }
  else{
    res.render("wdnt",{
      title : searchTerm,
      results : search
    });
  }
});


module.exports = router;
