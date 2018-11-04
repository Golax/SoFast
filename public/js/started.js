var files = [];
var new_files = [];

//ascolta se ci sono nuovi file e li aggiorna
document.getElementById("fUpload").addEventListener("change", (event) => {
	new_files = merge(files, toArray(event.target.files), new_files);	//aggiorna i file
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

//elimana una classe di nodi
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
	for (var i = this.length - 1; i >= 0; i--) {
		if (this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
}

//pulisce la lista
function clearList() {
	document.getElementsByClassName("file").remove();
}

//riempie la lista con i file
function fillList() {
	for (var file in files) {
		var node = document.createElement("li");
		node.setAttribute("id", files[file].name);
		node.setAttribute("class", "file");
		var text = document.createTextNode(files[file].name);
		node.appendChild(text);
		var icon = document.createElement("i");
		icon.setAttribute("class", "far fa-file");
		node.appendChild(icon);
		var dButton = document.createElement("button");
		dButton.setAttribute("class", "delete");
		icon.setAttribute("class", "fas fa-trash-alt");
		dButton.appendChild(icon);
		node.appendChild(dButton);
		document.getElementById("fList").appendChild(node);
		dButton.addEventListener("click", (event) => removeFile(event), false);
	}
}

//rimuove un elemento sia dalla lista che da files
function removeFile(event){
	for(var file in files)
		if(files[file].name==event.target.parentNode.parentNode.id)
			files.splice(file, 1);
	event.target.parentNode.parentNode.remove();
	updateList();
}

//trasforma i nuovi files in vecchi files
function getOlder(){
	files = files.concat(new_files);
	new_files.splice(0, new_files.length);
}

//aggiorna la lista
function updateList() {
	uploadNewFiles(new_files);
	getOlder();
	clearList();
	fillList();
}