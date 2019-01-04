var express = require('express');
var app = express();
var router = express.Router()

var apicontroller = require('./controllers/apicontroller');
var htmlcontroller = require('./controllers/htmlcontroller');

var port = process.env.PORT || 3000;

// MIDDLEWARE ADDED - SAYING TO REFER TO SPECIFIED PATH FOR GIVEN PATH
app.use('/assets', express.static(__dirname + '/public'));

//TEMPLATE ENGINE - VIEW
app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
    console.log("req url: ", req.url, req.body);
    next();  // RUN THE NEXT MIDDLEWARE : HERE USE,GET ALL ARE MIDDLEWARE
})

app.get("/", function (req, res) {
    res.send("Home page")
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