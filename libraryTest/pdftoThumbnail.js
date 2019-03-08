const pdf = require('pdf-thumbnail');
const pdfBuffer = require('fs').readFileSync('./businesscard.pdf');
var fs = require('fs');


pdf(pdfBuffer, {
    compress: {
        type: 'JPEG', 
        quality: 30    
    }
}
)
    .then(data => data.pipe(fs.createWriteStream("./imagetumbnail.jpg")))
    .catch(err => console.error(err))