const fs = require("fs");

module.exports = file => {
	if(fs.existsSync(__dirname + "/pages/" + file + ".js")){
		let data = require("./pages/" + file);

		return {
			title: data.title || "Untitled",
			includeNav: true,
			nav: "<h3>Projects</h3>" + require("./nav")(false),
			includeSidebar: true,
			sidebar: data.sidebar || "<p>This project does not have a description</p>",
			main: data.main || "<p>This project does not have any content</p>"
		};
	} else {
		return require("../404");
	}
}
