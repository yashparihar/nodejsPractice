const fs = require('fs');

const htmlTopdf = require('html-pdf');
const pdfTothumbnail = require('pdf-thumbnail');



var ejs = require('ejs');


var data = {
    company_logo: "http://d133th49upe1sl.cloudfront.net/images/theme/default_logo.png",
    buyer_company: "Microsoft inc",
    buyer_address: "",
    buyer_email: "sales@microsoft.com",
    buyer_phno: "+1 942 224 643",

    supplier_company: "Facebook Inc",
    supplier_address: "",
    supplier_email: "sales@microsoft.com",
    supplier_phno: "+1 942 224 643",

    invoice_id: "INVOICE001",
    invoice_date: "12 Aug,2018",
    due_date: "12 July,2018",

    items: [
        { item_name: "Logitech", qty: 157, price: 575, total: 71000 },
        { item_name: "Maruti", qty: 15, price: 675, total: 72000 },
        { item_name: "Zebronic", qty: 12, price: 175, total: 32000 }
    ]
}

data2 = { // tax ?

    "business_logo_url": "http://d133th49upe1sl.cloudfront.net/images/theme/default_logo.png",
    // supplier_email: "sales@microsoft.com",
    // buyer_email: "sales@microsoft.com",
    // due_date: "12 July,2018",


    "docType": "invoice",
    "amount": 458.78,

    "invoice_id": "53f270cd-9722-4c9f-a402-fd573bb8541a",

    "invoice_status": "Paid",
    "order_id": 1052,

    "invoice_path": "1550644858837.pdf",
    "invoice_thumb": "1550644858837.jpg",

    "created_time": 1550724788, //? invoice date

    "invoice_to": "Roshni pvt.ltd",

    "buyer_address": {
        "address_id": 22,
        "user_id": 3,
        "address_type": "Primary",
        "person_name": "Roshni Patel",
        "line1": "",
        "line2": "202-203, Baleshwar Avenue, Opposite Rajpath Club, SG Highway, Ahmedabad, Gujarat 380054, India",
        "latitude": 23.0340847,
        "longitude": 72.51066679999997,
        "country_name": "India",
        "state_name": "Gujarat",
        "city_name": "Ahmedabad",
        "zip_code": "380054",
        "mobile": "+918745954784"
    },
    "buyer_name": "Roshni pvt.ltd",
    "supplier_name": "Jumbo Elocronics Private Limited",
    "supplier_address": {
        "address_id": 23,
        "user_id": 5,
        "address_type": "Primary",
        "person_name": "Roshni Patel",
        "line1": "",
        "line2": "202-203, Baleshwar Avenue, Opposite Rajpath Club, SG Highway, Ahmedabad, Gujarat 380054, India",
        "latitude": 23.0340847,
        "longitude": 72.51066679999997,
        "country_name": "India",
        "state_name": "Gujarat",
        "city_name": "Ahmedabad",
        "zip_code": "380054",
        "mobile": "+919878457845"
    },


    "products": [ //total : ?
        {
            "quantity": 1,
            "price": 229.39,
            "title": "Apple iWatch Rose Gold"
        },
        {
            "quantity": 1,
            "price": 229.39,
            "title": "Apple iWatch Rose Gold"
        }
    ]
}


function toReadableDay(unixtimestamp) {
    // Months array
    var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp * 1000);

    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();

    return `${month} ${day}, ${year}`
}



function getInvoiceHtml(value) {

    value.created_time = toReadableDay(value.created_time)

    return new Promise((resolve, rej) => {
        ejs.renderFile('./invoice_template.ejs', value, function (err, result) {
            // render on success
            if (result) {

                // RETURN HTML FEROM HERE

                /* TESTING */
                var options = { filename: 'template.pdf', format: 'A4', orientation: 'portrait', type: "pdf" };

                pdf.create(result, options).toFile(function (err, res) {
                    console.log("done");
                    if (err) return console.log(err);
                    console.log(res);
                    // resolve(res)
                });
                /**/
                resolve(result);
            }
            // render or error
            else {
                rej(err);
            }
        })
    })

}


async function pdfThumbconversion(  pdfLoc, thumbnailLoc) {

    let payload = {
        logoUrl = "https://d1xil3xx949y53.cloudfront.net/development/user/1535197051357czuvb.jpg",
        signUrl = "https://d1xil3xx949y53.cloudfront.net/live/user/3/signature/200x70/1547206088027.png",

        title: "Contract Title",
        supplierName: "Lorem puppet",
        date:"Aug 18,2018",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }

    return new Promise((res, rej) => {

        ejs.renderFile('./contract.ejs', function (err, html) {
            // htmlTopdf.create(html, options).toFile(function (err, result) {

            var options = { filename: 'contract.pdf', format: 'A4', orientation: 'portrait', type: "pdf" };

            htmlTopdf.create(html, options).toFile(pdfLoc, function (err, result) {
                if (err) return console.log(err);

                // result.pipe(fs.createWriteStream(pdfLoc));

                // GENERATE THUMBNAIL FROM PDF
                const pdfBuffer = fs.readFileSync(pdfLoc);
                pdfTothumbnail(pdfBuffer, {
                    compress: {
                        type: 'JPEG',
                        quality: 100
                    }
                }).then(async function (data) {
                    data.pipe(fs.createWriteStream(thumbnailLoc));
                    res("done");
                }).catch(err => {
                    console.error(err);
                    throw new Error(err);
                })
            });
        })


    })
}


(async function () {
    // let htmldetail = await getInvoiceHtml(data2);
    pdfThumbconversion("./contract.pdf", "./contract.jpg"  )
})();




// ejs.renderFile('./demo.ejs',  data , function (err, result) {
//     // render on success
//     if (result) {
//         html = result;
//         // RETURN HTML FEROM HERE

//         /* TESTING */
//         var options = { filename: 'ejbdfemo.pdf', format: 'A4', orientation: 'portrait', type: "pdf" };

//         pdf.create(html, options).toFile(function (err, res) {
//             if (err) return console.log(err);
//             console.log(res);
//         });
//         /**/
//     }
//     // render or error
//     else {
//         //    res.end('An error occurred');
//         console.log(err);
//     }
// })


