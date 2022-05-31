const fileEndingRegex = /(\.[^\/]+)$/gm;

/**
 * @param {string} path The string path of what you want to build
 * @param {object} query Any query parameters (removed for now)
 */
function build(path){
	// Remove file ending from file name if applicable
	if(fileEndingRegex.test(path)){
		path = path.replace(fileEndingRegex, "");
	}

	const paths = path.split("/").filter(section => section.trim() !== "");
	let page;

	switch(paths[0]){
		case undefined:
		case "home":
		case "index":
			// Home page
			page = {
				title: "Home",
				includeNav: false,
				includeSidebar: false,
				main: `
			<p>Welcome to my website I guess</p>
				`
			};
			break;
		case "projects":
			page = !!paths[1] ? require("./projects/build")(paths[1]) : require("./projects/index");
			break;
		default:
			page = require("./404");
			break;
	}

	// Create page
	let builtPage = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Alduris.com &mdash; ${page.title}</title>
		<link rel="stylesheet" type="text/css" href="/stylesheets/theme.css">
		<link rel="stylesheet" type="text/css" href="/stylesheets/main.css">
	</head>
	<body class="` + (page.includeNav ? "n" : "") + (page.includeSidebar ? "s" : "") + `">
		<header><p><a href="/">Alduris.com</a> &mdash; <a href="/blog">Blog</a> | <a href="/projects">Projects</a> | <a href="/about">About</a></p></header>
		` + (page.includeNav ? `<section><nav>
			` + page.nav + `
		</nav></section>
		` : "") + "<main>\n" + (page.main) + "\t\t\n</main>" + (page.includeSidebar ? `
		<section>
			` + page.sidebar + `
		</section>` : "") + 
		`
		<footer>Created by Alduris &ndash; ${new Date().getFullYear()}</footer>
	</body>
</html>`;
	return builtPage;
}

module.exports = {
	build: build
};
