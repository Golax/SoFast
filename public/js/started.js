var files = [];
var new_files = [];

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
	for (var file in new_files) {
		var node = document.createElement("li");
		node.setAttribute("id", new_files[file].name);
		node.setAttribute("class", "file");
		var text = document.createTextNode(new_files[file].name);
		node.appendChild(text);
		var trash = document.createElement("i");
		trash.setAttribute("class", "fas fa-trash-alt delete");
		trash.addEventListener("click", (event) => removeFile(event), false);
		node.appendChild(trash);
		var downloadLink = document.createElement("a");
		downloadLink.setAttribute("href", "/files" + window.location.pathname + '/' + new_files[file].name);
		downloadLink.setAttribute("download", new_files[file].name);
		var downloadIcon = document.createElement("i");
		downloadIcon.setAttribute("class", "fas fa-download download");
		downloadLink.appendChild(downloadIcon);
		node.appendChild(downloadLink);
		document.getElementById("fList").appendChild(node);
		
	}
}

//rimuove un elemento sia dalla lista che da files in base al bottone che la invoca
function removeFile(event){
	for(var file in files)
		if(files[file].name==event.target.parentNode.id){
			deleteFile(files[file]);
			files.splice(file, 1);
		}
	event.target.parentNode.remove();
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
}