var fs = require('fs');
var pdf = require('html-pdf');

// var fetchDiv = '<div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>'
var html = fs.readFileSync('./invoice.html', 'utf8');

// var html = fs.readFileSync('./test/businesscard.html', 'utf8');
// var html= `<html><body>${fetchDiv}</body></html>`
var options = { format: 'A4' };
// var options = { width: "8in" };

pdf.create(html, options).toFile('./invoice.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});