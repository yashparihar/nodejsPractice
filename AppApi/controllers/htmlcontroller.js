var express = require('express');
var router = express.Router()

var someCheck = function(req,res,next) {
    req.element = "this yash inserted ";
    next();
}

router.use(someCheck)

router.get('/', function (req, res, next) {
    res.render('index', { person: "yashu" })
    console.log("element:- ", req.element)
    next()
    // res.send(`<html><head>
    // <link href=assets/style.css type=text/css rel=stylesheet />
    // </head><body>Hell yash ${req.params.id} </body></html>`)
})

router.get('/person/:id', function (req, res) {
    res.send(`<html><head></head><body>Hell yash ${req.params.id} </body></html>`)
})

router.get('/api', function (req, res) {
    res.json({
        firstn: 'yash', lastn: "pari"
    })
})

var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

router.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res, next) {
    console.log('and again .. !')
    next();
}, function (req, res) {
    res.send('Hello from D!')
})

router.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    })


module.exports = router;


