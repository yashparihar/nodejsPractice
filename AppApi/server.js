var express = require('express');
var app = express();
var router = express.Router()
var cors = require('cors')
var http = require('http')
var apicontroller = require('./controllers/apicontroller');
var htmlcontroller = require('./controllers/htmlcontroller');

var port = process.env.PORT || 3000;
console.log("YOOOOOOOOOOO 2342423422222");

app.use(cors());


app.use((req, res, next) => {

    // ...
     
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    // res.header('Access-Control-Allow-Credentials', true); 
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELTE, OPTIONS');

    console.log("==> ", req.method);
    if (req.method === "OPTIONS"){
        console.log("in options ", req.url);

        res.json({"yoo":"yesss"})
    }
    next();
    // ...
     
    });



// MIDDLEWARE ADDED - SAYING TO REFER TO SPECIFIED PATH FOR GIVEN PATH
app.use('/assets', express.static(__dirname + '/public'));

//TEMPLATE ENGINE - VIEW
app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
    
    next();  // RUN THE NEXT MIDDLEWARE : HERE USE,GET ALL ARE MIDDLEWARE
})

app.get("/", function (req, res) {
    res.send("Home page")
})

app.get("/getalldb", function (req, res) {

    var options = {
        host: "localhost",
        port: 5985,
        path: '/testdb/_all_docs',
        method: 'GET'
      };
      
      http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      }).end();

    res.json({"ele1":"sdfsdfd","ele2":"fhfgasdfsdfs"});
})

app.use("/abc", 
    router.use( function (req, res, next) {
        console.log("called /mno");
        // res.send(" @ abc / mno");
        // res.end();
        // next('router')
        next();
    }),
    router.get("/pqr/:id", function (req, res) {
        console.log("called /pqr, id: ", req.headers);
        res.send(" @ abc / pqr");
        res.end();
        // res.next();
    })
)

app.use('/file', htmlcontroller)

apicontroller(app)

app.listen(port);