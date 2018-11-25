var socket = io.connect('192.168.1.100:3000', {path: window.location.pathname});
var uploader = new SocketIOFileClient(socket);

function uploadNewFiles(files){
	uploader.upload(files);
	uploader.on("stream", (fileInfo) => console.log(fileInfo.name + ' ' + fileInfo.sent+'/'+fileInfo.size))
	uploader.on("complete", (fileInfo) => console.log(fileInfo.name+" correttamente inviato"));
}

function deleteFile(file){
	socket.emit("file_on_delete", file.name);	
}

socket.on("files", function(files){
	files.forEach((file) => new_files.push(file));
	updateList();
});

socket.on("new_file", function(file){
	new_files.push(file);
	updateList();
});

socket.on("file_deleted", function(filename){
	for(var x in files)
		if(files[x].name==filename)
			files.splice(x, 1);
	document.getElementById(filename).remove();
});

socket.on("timerUp", () => location.reload());