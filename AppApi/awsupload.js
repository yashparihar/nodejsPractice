var fs = require('fs');

var htmlTopdf = require('html-pdf');
const pdfTothumbnail = require('pdf-thumbnail');

// const pdfLoc = './businesscard.pdf';
const thumbnailLoc = "./imagetumbnail.jpg";


var dummyImgUrl = "http://d1xil3xx949y53.cloudfront.net/development/user/3/signature/200x70/1549861731385.png";


const AWS = require('aws-sdk');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const pdfLoc = './businesscard.pdf';


AWS.config.update({
    accessKeyId: "<access key>",
    secretAccessKey: "<secret access key>"
});

const S3_BUCKET = "test-blockchain"

AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: S3_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};


async function funcall() {
    // UPLOADING TO AWS S3 BUCKET    
    // const form = new multiparty.Form();
    // form.parse(request, async (error, fields, files) => {
    //     if (error) throw new Error(error);
    try {
        // const path = files.file[0].path;
        const buffer = fs.readFileSync(pdfLoc);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        // return response.status(200).send(data);
    } catch (error) {
        // return response.status(400).send(error);
    }
    // });
}


// APPENDING IMAGE SIGN TAG INTO HTML CONTENT
let imageTag = `<img style='float:right' src='${dummyImgUrl}'>`;
var html = `<html><body>sfffddffsdf sdfsdfs dfsd sd<br>${imageTag} </body></html>`
var options = { format: 'Letter' };

// CONVERTING HTML CONTENT TO PDF
htmlTopdf.create(html, options).toFile(pdfLoc, function (err, result) {
    if (err) return console.log(err);
    // console.log(res); // { filename: '/app/businesscard.pdf' }


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
            // res.json({ "status": "200" });
            funcall();
        })
        .catch(err => console.error(err))
});
