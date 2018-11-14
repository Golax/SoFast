const express = require('express');
const crypto = require('crypto');
const fs = require("fs");

module.exports = function(server){
	var router = express.Router();
	
	router.get('/', function(req, res){
		var session = crypto.randomBytes(4).toString('hex');
		res.redirect('/' + session);
		var dir = "../SoFast/Files/" + session;
		if(!fs.existsSync(dir))	fs.mkdirSync(dir);

		require("../socket-server.js")(server, session);
	});

	return router;
}