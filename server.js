var http = require('http');
var fs = require('fs');

// CUSTOM ROUTING

http.createServer(function (req, res) {

    if (req.url === "/") {
        fs.createReadStream(__dirname + '/index.htm').pipe(res);
    }

    if (req.url === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })

        // STREAM OF HTML DATA
        // fs.createReadStream(__dirname+'/index.htm').pipe(res)

        // TEMPLATE LITERAL STREAM HTML
        // var msg = "This is yash ";
        // html = html.replace('{msg}', msg);
        // res.end(html);

        // SERIALIZE RES DATA
        let datar = {
            data: "yes it is"
        }
        let datarJson = JSON.stringify(datar);

        console.log(datar, typeof (datar), datarJson, typeof (datarJson));
        res.end(datarJson)
    }

    res.writeHead(404);
    res.end();

}).listen(3001, 'localhost')