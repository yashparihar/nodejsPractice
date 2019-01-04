
var https = require('http')


var getheaders = { 
    "api_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGFkbWluLmNvbSIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwianRpIjoiMCIsImlzcyI6Imh0dHA6Ly9lLXByb2N1cmUubmV0LnMzLXdlYnNpdGUuYXAtc291dGgtMS5hbWF6b25hd3MuY29tLyIsImlhdCI6MTUyOTQ3NDIxOX0.9T3ETVVw1yi2qBBczb4rgrlC0rY9vvf6Lc13QOzA5EY"
};

var optionsget = {
    host : '192.168.0.105', // here only the domain name
    port : 8080,
    path : '/order/getOrderById', // the rest of the url with parameters if needed
    method : 'GET', // do GET
    headers : getheaders
};


console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');

// do the GET request
var reqGet = https.request(optionsget, function(res) {

    res.on('data', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');
    });
    res.on('error', function(err){
        console.log("err ", err);
    })
});

reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});
