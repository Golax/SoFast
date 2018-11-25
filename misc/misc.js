//MODULE FOR FILE AND SERVER OPERATIONS\
//IT IS A LIBRARY OF FUNCTIONS


const fs = require('fs-extra');
const path = require('path');

exports.readFilesSync = function(dir, files = []) {
	fs.readdirSync(dir)
	  .forEach(filename => {
			const name = path.parse(filename).name + path.parse(filename).ext;
			const ext = path.parse(filename).ext;
			const filepath = path.resolve(dir, filename);
			const stat = fs.statSync(filepath);
		
			if (stat.isFile) files.push({ filepath, name, ext, stat });
	  });
  
	return files;
}

exports.readFileSync = function(filePath)	{
	const name = path.parse(filePath).name + path.parse(filePath).ext;
	const ext = path.parse(filePath).ext;
	const stat = fs.statSync(filePath);

	if (stat.isFile) 
		return { filePath, name, ext, stat };
}

exports.deleteFileSync = (filePath) => fs.unlinkSync(filePath);

exports.deleteDirSync = (dirPath) => fs.removeSync(dirPath);