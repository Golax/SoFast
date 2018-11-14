var socket = io.connect('localhost:3000', {path: window.location.pathname});
var uploader = new SocketIOFileClient(socket);

function uploadNewFiles(files){
	uploader.upload(files);
	uploader.on("stream", (fileInfo) => console.log(fileInfo.name + ' ' + fileInfo.sent+'/'+fileInfo.size))
	uploader.on("complete", (fileInfo) => console.log(fileInfo.name+" correttamente inviato"));
}

socket.on("files", function(files){
	files.forEach((file) => new_files.push(file));
	updateList();
});

socket.on("new_file", function(file){
	new_files.push(file);
	updateList();
});