var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function (app) {
    app.post('/person', jsonParser, function (req, res) {
        res.send("Thank you");
        console.log("body:---", req.body);
    })
}