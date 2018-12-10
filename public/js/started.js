var files = [];
var new_files = [];

window.onload = isEmpty();

//ascolta se ci sono nuovi file e li aggiorna
document.getElementById("fUpload").addEventListener("change", (event) => {
	uploadNewFiles(document.getElementById("fUpload"));
	new_files = merge(files, toArray(event.target.files), new_files);
	updateList();	//aggiorna la lista
	event.target.value = '';	//resetta la cache del file input
});

//trasforma un oggetto in un array
function toArray(fileList) {
	return Array.prototype.slice.call(fileList);
}

//prende due array
//se il primo `e vuoto allora accoda il secondo
//altrimenti scorre tutto il secondo
//per ogni oggetto del secondo controlla se ne esiste un uguale del primo
//se non esiste, lo accoda al primo
//ritorna il primo
function merge(arr1, arr2, arr3) {
	if (arr1.length == 0)	return arr3.concat(arr2);
	for (var obj in arr2)
		if (!findDuplicate(arr1, arr2[obj])){
			arr3.push(arr2[obj]);
		}
	return arr3;
}

//scorre un array alla ricerca di un duplicato
//se lo trova torna true, altrimenti false
function findDuplicate(arr1, obj) {
	for (var element in arr1)
		if (arr1[element].name == obj.name)
			return true;
	return false;
}

//elimina un nodo
Element.prototype.remove = function () {
	this.parentElement.removeChild(this);
}

//riempie la lista con i file
function fillNew() {
	for (var file in new_files){
		var node = document.createElement("div");
		node.id = new_files[file].name;
		node.setAttribute("class", "row");
			var nodeinfo = document.createElement("div");
			nodeinfo.setAttribute("class", "item")
				var nodefilepic = document.createElement("i");
				nodefilepic.setAttribute("class", "far fa-file");
				nodeinfo.appendChild(nodefilepic);
				var nodefilename = document.createTextNode(new_files[file].name);
				nodeinfo.appendChild(nodefilename);
			var nodeactions = document.createElement("div");
			nodeactions.setAttribute("class", "item");
				var downloadLink = document.createElement("a");
				downloadLink.setAttribute("href", "/files" + window.location.pathname + '/' + new_files[file].name);
				downloadLink.setAttribute("download", new_files[file].name);
					var downloadIcon = document.createElement("i");
					downloadIcon.setAttribute("class", "fas fa-download download");
					downloadLink.appendChild(downloadIcon);
				nodeactions.appendChild(downloadLink);
				var trash = document.createElement("i");
				trash.setAttribute("class", "far fa-trash-alt delete");
				trash.addEventListener("click", (event) => removeFile(event), false);
				nodeactions.appendChild(trash);
			node.appendChild(nodeinfo);
			node.appendChild(nodeactions);
		document.getElementById("fList").appendChild(node);
	}
}

//rimuove un elemento sia dalla lista che da files in base al bottone che la invoca
function removeFile(event){
	for(var file in files)
		if(files[file].name==event.target.parentNode.parentNode.id){
			deleteFile(files[file]);
			files.splice(file, 1);
		}
	event.target.parentNode.parentNode.remove();
	isEmpty();
}

//trasforma i nuovi files in vecchi files
function getOlder(){
	files = files.concat(new_files);
	new_files.splice(0, new_files.length);
}

//aggiorna la lista
function updateList() {
	fillNew();
	getOlder();
	isEmpty();
}

//copy to clipboard
function copyToClipboard() {
	const el = document.createElement('textarea');
	el.value = window.location.href;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	alert("link copied!");
};


//controlla se l'elemento flist contiene dei file, se si, li mostra altrimenti fa fuoriuscire il ban che non ha file
function isEmpty(){
	if(document.getElementById("fList").childElementCount > 1)
		document.getElementById("noFiles").style.display = "none";
	else
		document.getElementById("noFiles").style.display = "block";
}