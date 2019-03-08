var fs = require("fs");
var filename = "./input.txt";
var buf = fs.readFileSync(filename, "utf8");

console.log(buf);