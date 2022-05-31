const express = require("express");
var https = require('https');
var http = require('http');
// const session = require("express-session");
const app = express();

const builder = require("./app/builder");

// require("dotenv").config();

// app.use(session({
// 	secret: process.env.SESSION_SECRET
// }))

app.use(express.static(__dirname + "/public")).use("*", (req, res) => {
	// const path = req.path.split("/").filter(section => section.trim() !== "");
	// const query = req.query;
	
	res.send(builder.build(req.originalUrl));
});

// app.listen(port, () => {
// 	console.log(`Server listening on port ${port}`);
// });

http.createServer(app).listen(80);
https.createServer(app).listen(443);
console.log("Server created");