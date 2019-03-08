/*
ATTACH IMAGE SIGN IN HTML
CONVERT HTML TAG TO PDF 
AND GENERATE A THUMBNAIL FROM THAT PDF

Dependency for the same
- npm i html-pdf 
- npm i pdf-thumbnail
*/

var bodyParser = require('body-parser');
var fs = require('fs');

var htmlTopdf = require('html-pdf');
const pdfTothumbnail = require('pdf-thumbnail');

const pdfLoc = './businesscard.pdf';
const thumbnailLoc = "./imagetumbnail.jpg";
const nano = require('nano')('http://localhost:5985');
const database = nano.use('testdb')
// const nano = require('nano')('http://localhost:5985');
// create application/json parser
var jsonParser = bodyParser.json()


var dummyImgUrl = "http://d1xil3xx949y53.cloudfront.net/development/user/3/signature/200x70/1549861731385.png";

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })




module.exports = function (app) {

    app.post('/createContract', jsonParser, function (req, res) {
        console.log("Request div content:- ", req.body.divcontent);

        // APPENDING IMAGE SIGN TAG INTO HTML CONTENT
        let imageTag = `<img style='float:right' src='${dummyImgUrl}'>`;
        var html = `<html><body>${req.body.divcontent}<br>${imageTag} </body></html>`
        var options = { format: 'Letter' };

        // CONVERTING HTML CONTENT TO PDF
        htmlTopdf.create(html, options).toFile(pdfLoc, function (err, result) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }


            // GENERATE THUMBNAIL FROM PDF
            const pdfBuffer = fs.readFileSync(pdfLoc);
            pdfTothumbnail(pdfBuffer, {
                compress: {
                    type: 'JPEG',
                    quality: 30
                }
            })
                .then((data) => {
                    data.pipe(fs.createWriteStream(thumbnailLoc));
                    res.json({ "status": "200" });
                })
                .catch(err => console.error(err))
        });
    })

    app.post("/insertData", jsonParser, (req,res) => {
        console.log("req ", req.body)
 
        database.insert(
            req.body 
        ).then((response) => {
            // p.processAPIResponse(response)
            console.log(response)
            res.json(response)
          })
    })
}