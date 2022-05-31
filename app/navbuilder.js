const fs = require("fs");

/**
 * Creates the contents of a directory
 * @param {boolean} separate Whether to separate the content by alphabet (`true`) or lump it together (`false`)
 * @param {string} name The directory to put in links
 * @param {string} dir The directory to look for files
 */
module.exports = (separate, name, dir) => {
	// Generate list of files in directory
	let list = [];
	fs.readdirSync(dir).forEach(file => {
		// Big long code thingy to capitalize the first letter of each word
		// Adapted from https://stackoverflow.com/a/4878800
		list.push([
			file.substring(0, file.indexOf(".")),
			file.substring(0, file.indexOf("."))
				.split("_")
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(" ")
		]);
	});

	// Sort the list by alphabet, trying to get around differences in case
	list = list.sort((a, b) => a[1].toLowerCase().localeCompare(b[2].toLowerCase()));

	let res = "";
	let lastLetter = "";
	for(let item of list){
		if(separate && item[1].charAt(0) !== lastLetter){
			lastLetter = item[1].charAt(0);
			res += "<h3>" + lastLetter + "</h3>";
		}
		res += `<p class="navpage"><a href="/${name}/${item[0]}">${item[1]}</a></p>`;
	}
	return res;
};
