var socket = io.connect('192.168.1.129:3000', {path: window.location.pathname});
var uploader = new SocketIOFileClient(socket);

function uploadNewFiles(files){
	uploader.upload(files);
	uploader.on("stream", (fileInfo) => {
		console.log(fileInfo.name + ' ' + fileInfo.sent+'/'+fileInfo.size);
		let sent = Math.floor(fileInfo.sent * 100/fileInfo.size);
		document.getElementById(fileInfo.name).style.background = "linear-gradient(to right, #B5FFA8 "+sent+"%, white "+sent+"%)";
	});
	uploader.on("complete", (fileInfo) => {
		console.log(fileInfo.name+" correttamente inviato");
		document.getElementById(fileInfo.name).style.background = "linear-gradient(to right, #B5FFA8 100%, white 100%)";
	});
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
	isEmpty();
});

socket.on("timerUp", () => location.reload());