//MODULO PER SOCKET.IO
//WHERE MAGIC HAPPENS!! :D

const misc = require("./misc/misc.js");
const SocketIOFile = require("socket.io-file");

module.exports = function(server, session){
	var io = require("socket.io").listen(server, {path: '/'+session});	//configuro io
	
	io.on("connection", function(socket){
		var files = misc.readFilesSync("./Files/" + session);	//prendo i file nella cartella
		socket.emit("new_files", files);						//mando i file
		
		var uploader = new SocketIOFile(socket, {				//setto l'uploader
			uploadDir: "./Files/" + session,		
			accepts: [],		
			maxFileSize: 500000000, 						
			chunkSize: 10240,							
			transmissionDelay: 0,
			overwrite: true 	
		});
		
		uploader.on("complete", function(file){					//quando mi arriva un file
			socket.broadcast.emit("new_file", misc.readFileSync("./Files/" + session + '/' + file.name));
		});
	});
}