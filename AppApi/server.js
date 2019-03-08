var express = require('express');
var app = express();
var router = express.Router()
var cors = require('cors')
var http = require('http')
var apicontroller = require('./controllers/apicontroller');
var htmlcontroller = require('./controllers/htmlcontroller');
const nano = require('nano')('http://localhost:5985');

const database = nano.use('testdb')

var data = {
    company_logo: "http://d133th49upe1sl.cloudfront.net/images/theme/default_logo.png",
    buyer_company: "Microsoft inc",
    buyer_address: "",
    buyer_email:"sales@microsoft.com",
    buyer_phno: "+1 942 224 643",

    supplier_company: "Facebook Inc",
    supplier_address: "",
    supplier_email:"sales@microsoft.com",
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

// async function asyncCall() {
//     // await nano.db.destroy('alice')
//     await nano.db.create('alice')
   
//     const response = await alice.insert({ happy: true }, 'rabbit')
//     return response
//   }
//   asyncCall()
// let obj = require("./utils/file2") 

var port = process.env.PORT || 8000;

app.use(cors());

app.use(async function (req, res, next) {
    //  await nano.db.create('alice')
     next();
})

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

app.get("/getalldb", function (req, response) {

    nano.db.list().then((body) => {
       console.log("=> ",body);
       response.json(body);
      });
    
    // var options = {
    //     host: "localhost",
    //     port: 5985,
    //     path: '/_all_dbs',
    //     method: 'GET'
    //   };
     
    //   var data=[];

    //   http.request(options, function(res) {
    //     console.log('STATUS: ' + res.statusCode);
    //     console.log('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     res.on('data', function (chunk) {
    //     //  data+=chunk
    //     data.push(chunk);
    //     });
    //     res.on('end', function() {
    //         data = data.join("");
    //         console.log("data:- ", data);
    //         response.json(JSON.parse(data) );
    //     })
    //   }).end()

})

app.get("/getFile", function(req,res) {
    res.render('./demo.ejs',  data );
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