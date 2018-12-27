var fs = require('fs');

var zlib = require('zlib');

// console.log("dirname: ", __dirname);
// var hello = fs.readFile(__dirname + "/hello.txt", 
// (err,data) => {
//     console.log("done", data.toString())
// } );

var readable = fs.createReadStream( __dirname + '/hello.txt',
 { encoding: "utf8", 
 highWaterMark: 50 * 1024 } );  // READ BYTE AT A TIME

var writable = fs.createWriteStream( __dirname + '/writehello.txt ');

// READ CONTENT AND WRITE VIA VERSA - WAY ONE
// readable.on( 'data', function(chunk) {
//     console.log(chunk.length);
//     writable.write(chunk)
// })

var compressed = fs.createWriteStream(__dirname + '/hello.txt.gz');

// READ FROM 1 STREAM AND WRITE TO OTHER STREAM USING PIPE
var gzip = zlib.createGzip();

// READ CONTENT AND WRITE - WAY 2
readable.pipe(writable) ;

//CHAINNING : PASSING STREAM
readable.pipe(gzip).pipe(compressed);
