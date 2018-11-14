var express = require("express");
var http = require("http");

var app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views/');

var server = http.createServer(app);

//rendo pubblici la cartella public
app.use('/', express.static(__dirname + "/public/"));

//se arriva una richiesta alla pagina principale invio la pagina html
app.get('/', (req, res) =>	res.render("index.ejs", {started: false}));

//se arrivata una a start
app.use("/start", require("./routes/start.js")(server));

//se arriva una richiesta sesison
app.use("/:session([A-Za-z0-9]+)/", require("./routes/session.js"));

server.listen(port, () => console.log(`Server on port: ${port}.`));