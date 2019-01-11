var bodyParser = require('body-parser');

const nano = require('nano')('http://localhost:5985');
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {
    app.post('/person', jsonParser, function (req, res) {

        nano.db.list().then((body) => {
            // body is an array
            body.forEach((db) => {
              console.log("==>", db);
            });
          });
        res.send("Thank you");
        console.log("body:---", req.body);
    })
}