var Scraper = require("image-scraper")
var scraper = new Scraper("http://apod.nasa.gov/apod/astropix.html");
var search_string = "";
var fs = require('fs');
var out = "";
process.argv.forEach(function (val, index, array) {
  if(index>1){
    search_string += "+"+ val
  }
});



module.exports = {
  searchByString: function(search_string){
  var images = [];
  scraper.address = "https://www.google.com/search?q="+search_string+"&tbm=isch";
  scraper.on("image",function(image){
    var queued_img = new Promise((resolve, reject) => {0
    out += image.attributes.src + "\n"
  	console.log(image.attributes.src)
      fs.appendFile('log.txt', image.attributes.src + "\n", function (err) {
        if (err) {
          // append failed
        } else {
          // done
        }
      })
      images.push(queued_img)
      });
  })
  scraper.scrape();
  Promise.all(images).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
}
}
module.exports.searchByString("cat")
