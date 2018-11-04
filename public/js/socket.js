var socket = io("/"+session_id);
var delivery = new Delivery(socket);


function uploadNewFiles(new_files){
	var delivery = new Delivery(socket);

	for(var i in new_files){
		delivery.send(new_files[i]);
		console.log("file sent");
	}
}

// socket.on("ciao", function(message){
// 	console.log(message);
// })