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

scraper.address = "https://www.google.com/search?q="+search_string+"&tbm=isch";
scraper.on("image",function(image){
    out += image.attributes.src + "\n"
    fs.appendFile('log.txt', image.attributes.src + "\n", function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })
})
scraper.scrape();

module.exports = {hi:"what is good"}
