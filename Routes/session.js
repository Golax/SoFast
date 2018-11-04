const express = require('express');
const crypto = require('crypto');
var dl = require('delivery');
var fs = require('fs');

module.exports = function(io){
	let router = express.Router();
	
	router.get('/', (req, res) => res.redirect('/start/' + crypto.randomBytes(32).toString('hex')));

	router.get('/:session', (req, res) => {
		res.render('index.ejs', {started: true, session_id: req.params.session});	//mando la pagina
		var dir = '../SoFast/Files/' + req.params.session;	//creo la cartella
		if (!fs.existsSync(dir))	fs.mkdirSync(dir);
		var session = io.of('/'+req.params.session);	//mi collego al socket

		session.on("connection", function(socket){
			var delivery = dl.listen(socket);
			delivery.on('receive.success', function(file){
				fs.writeFileSync(dir+'/'+file.name,file.buffer);
				socket.broadcast.emit("ciao", "ciao!");
			});
		});
	});

	return router;
}