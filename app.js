var express = require('express');

var app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views/');

var server = app.listen(port, () => console.log(`Server on port: ${port}.`));	//avvio il server
var io = require("socket.io")(server);	//configuro io


//la root principale dove andranno a finire tutte le richieste
app.use('/', express.static(__dirname + "/public/"));

//se arriva una richiesta alla pagina principale invio la pagina html
app.get('/', (req, res) =>	res.render('index.ejs', {started: false}));

//se arrivata una richiesta personalizzata
app.use('/start', require('./Routes/session.js')(io));