
module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('index', { person:"yashu" })
        // res.send(`<html><head>
        // <link href=assets/style.css type=text/css rel=stylesheet />
        // </head><body>Hell yash ${req.params.id} </body></html>`)
    })
    
    app.get('/person/:id', function(req, res) {
        res.send(`<html><head></head><body>Hell yash ${req.params.id} </body></html>`)
    })
    
    app.get('/api', function(req, res) {
        res.json({
            firstn : 'yash', lastn:"pari"
        })
    })
}