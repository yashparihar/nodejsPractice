/*
ATTACH IMAGE SIGN IN HTML
CONVERT HTML TAG TO PDF 
AND GENERATE A THUMBNAIL FROM THAT PDF

Dependency for the same
- npm i html-pdf 
- npm i pdf-thumbnail
*/

const fs = require('fs');

const htmlTopdf = require('html-pdf');
const pdfTothumbnail = require('pdf-thumbnail');
// const S3Utils = require('./S3Utils')
// const dotenv = require('dotenv').config({ path: "./../.env" });




var dummyImgUrl = "http://d1xil3xx949y53.cloudfront.net/live/user/3/signature/100x70/1547206087976.png";
// createContractTemplate("1", "<div><text>test test test test</text></div>", dummyImgUrl, "right")


async function createContractTemplate(userId, divcontent, pdfFile,logoUrl, imageUrl) {
    // APPENDING IMAGE SIGN TAG INTO HTML CONTENT
    let html;
    let fileName;
    if (imageUrl && logoUrl ) {
        console.log("in-----");

        let imageTag = `<img style=" position: absolute; bottom: 0px; float: right; right: 0px;" src=${imageUrl}>`;

        let logoImageTag =` <img style=" height: 16vh;" src=${logoUrl}> <hr style=" margin-top: 1vh; margin-bottom: 4vh;">`

        html = `<html><body style=" height: 100vh; margin: 1em;">${logoImageTag}${divcontent}${imageTag}</body></html>`
    } else {
        html = `<html><body style=" height: 100vh; margin: 1em;">${divcontent}</body></html>`
    }
    console.log(html)
    const options = { format: 'Letter' };
    if (!pdfFile)
        fileName = userId + '-' + Date.now().toString();
    else
        fileName = pdfFile;
    const pdfLoc = fileName + '.pdf';
    console.log("pdfLoc");
    console.log(pdfLoc);
    const thumbnailLoc = fileName + '.jpg';


    async function conversion() {

        return new Promise((res, rej) => {
            // const thumbnailLoc = './1.jpg';
            // CONVERTING HTML CONTENT TO PDF
            htmlTopdf.create(html, options).toFile(pdfLoc, function (err, result) {
                if (err) return console.log(err);

                // GENERATE THUMBNAIL FROM PDF
                const pdfBuffer = fs.readFileSync(pdfLoc);
                pdfTothumbnail(pdfBuffer, {
                    compress: {
                        type: 'JPEG',
                        quality: 100
                    }
                }).then(async function (data) {
                    data.pipe(fs.createWriteStream(thumbnailLoc));
                    // await S3Utils.uploadFileToS3(process.env.CONTRACT_BUCKET_NAME, process.env.CONTRACT_FOLDER_TO_STORE + "/" + userId + "/Contract/Pdf", pdfLoc, userId, fileName)
                    // await S3Utils.uploadFileToS3(process.env.CONTRACT_BUCKET_NAME, process.env.CONTRACT_FOLDER_TO_STORE + "/" + userId + "/Contract/Pdf/Thumb", thumbnailLoc, userId, fileName)
                    res(fileName);
                }).catch(err => {
                    console.error(err);
                    throw new Error(err);
                })
            });
        })
    }

    return await conversion();
}



createContractTemplate("1", "Hello this is yash and who are you? ", null , dummyImgUrl, dummyImgUrl  )

// module.exports = {
//     createContractTemplate: createContractTemplate,
// }


//----------------------------------------------------------------------------------------




async function createContractTemplate_1(userId, divcontent, logoUrl=null) {
    // APPENDING IMAGE SIGN TAG INTO HTML CONTENT
    let html;
    let fileName;
    if (logoUrl) {
        console.log("in-----");
        // let imageTag = `<img style=" position: absolute; bottom: 0px; float: right; right: 0px;" src=${imageUrl}>`;
        let logoImageTag = ` <img style=" height: 16vh;" src=${logoUrl}> <hr style=" margin-top: 1vh; margin-bottom: 4vh;">`

        html = `<html><body style=" height: 100vh; margin: 1em;">${logoImageTag}${divcontent}</body></html>`
    } else {
        html = `<html><body style=" height: 100vh; margin: 1em;">${divcontent}</body></html>`
    }
    console.log(html)
    const options = { format: 'Letter' };
    if (!pdfFileName)
        fileName = userId + '-' + Date.now().toString();
    else
        fileName = pdfFileName;
    const pdfLoc = fileName + '.pdf';
    console.log("pdfLoc");
    console.log(pdfLoc);
    const thumbnailLoc = fileName + '.jpg';


    async function conversion() {

        return new Promise((res, rej) => {
            // const thumbnailLoc = './1.jpg';
            // CONVERTING HTML CONTENT TO PDF
            htmlTopdf.create(html, options).toFile(pdfLoc, function (err, result) {
                if (err) return console.log(err);

                // GENERATE THUMBNAIL FROM PDF
                const pdfBuffer = fs.readFileSync(pdfLoc);
                pdfTothumbnail(pdfBuffer, {
                    compress: {
                        type: 'JPEG',
                        quality: 100
                    }
                }).then(async function (data) {
                    data.pipe(fs.createWriteStream(thumbnailLoc));
                    await S3Utils.uploadFileToS3(process.env.CONTRACT_BUCKET_NAME, process.env.CONTRACT_FOLDER_TO_STORE + "/" + userId + "/Contract/Pdf", pdfLoc, userId, fileName)
                    await S3Utils.uploadFileToS3(process.env.CONTRACT_BUCKET_NAME, process.env.CONTRACT_FOLDER_TO_STORE + "/" + userId + "/Contract/Pdf/Thumb", thumbnailLoc, userId, fileName)
                    res(fileName);
                }).catch(err => {
                    console.error(err);
                    throw new Error(err);
                })
            });
        })
    }

    return await conversion();
}

async function createContractTemplate_2(userId, divcontent, pdfFileName, logoUrl=null, signUrl=null ) {
    // APPENDING IMAGE SIGN TAG INTO HTML CONTENT
    let html;
    let fileName;

    if (!logoUrl && signUrl){

        let imageTag = `<img style=" position: absolute; bottom: 0px; float: right; right: 0px;" src=${imageUrl}>`;
        html = `<html><body style=" height: 100vh; margin: 1em;">${divcontent}${imageTag}</body></html>`

    } else if (logoUrl && !signUrl){

        let logoImageTag = ` <img style=" height: 16vh;" src=${logoUrl}> <hr style=" margin-top: 1vh; margin-bottom: 4vh;">`
        html = `<html><body style=" height: 100vh; margin: 1em;">${logoImageTag}${divcontent}</body></html>`

    } else if (logoUrl && signUrl){

        let imageTag = `<img style=" position: absolute; bottom: 0px; float: right; right: 0px;" src=${signUrl}>`;
        let logoImageTag = ` <img style=" height: 16vh;" src=${logoUrl}> <hr style=" margin-top: 1vh; margin-bottom: 4vh;">`
        
        html = `<html><body style=" height: 100vh; margin: 1em;">${logoImageTag}${divcontent}${imageTag}</body></html>`

    } else if (!logoUrl && !signUrl){

        html = `<html><body style=" height: 100vh; margin: 1em;">${divcontent}</body></html>`
    }

    // if ()

    if (signUrl) {
        console.log("in-----");

        let imageTag = `<img style=" position: absolute; bottom: 0px; float: right; right: 0px;" src=${signUrl}>`;

        // let logoImageTag = ` <img style=" height: 16vh;" src=${logoUrl}> <hr style=" margin-top: 1vh; margin-bottom: 4vh;">`

        html = `<html><body style=" height: 100vh; margin: 1em;">${divcontent}${imageTag}</body></html>`
    } else {
        html = `<html><body style=" height: 100vh; margin: 1em;">${divcontent}</body></html>`
    }
    console.log(html)
    const options = { format: 'Letter' };
    if (!pdfFileName)
        fileName = userId + '-' + Date.now().toString();
    else
        fileName = pdfFileName;
    const pdfLoc = fileName + '.pdf';
    console.log("pdfLoc");
    console.log(pdfLoc);
    const thumbnailLoc = fileName + '.jpg';


    async function conversion() {

        return new Promise((res, rej) => {
            // const thumbnailLoc = './1.jpg';
            // CONVERTING HTML CONTENT TO PDF
            htmlTopdf.create(html, options).toFile(pdfLoc, function (err, result) {
                if (err) return console.log(err);

                // GENERATE THUMBNAIL FROM PDF
                const pdfBuffer = fs.readFileSync(pdfLoc);
                pdfTothumbnail(pdfBuffer, {
                    compress: {
                        type: 'JPEG',
                        quality: 100
                    }
                }).then(async function (data) {
                    data.pipe(fs.createWriteStream(thumbnailLoc));
                    await S3Utils.uploadFileToS3(process.env.CONTRACT_BUCKET_NAME, process.env.CONTRACT_FOLDER_TO_STORE + "/" + userId + "/Contract/Pdf", pdfLoc, userId, fileName)
                    await S3Utils.uploadFileToS3(process.env.CONTRACT_BUCKET_NAME, process.env.CONTRACT_FOLDER_TO_STORE + "/" + userId + "/Contract/Pdf/Thumb", thumbnailLoc, userId, fileName)
                    res(fileName);
                }).catch(err => {
                    console.error(err);
                    throw new Error(err);
                })
            });
        })
    }

    return await conversion();
}

