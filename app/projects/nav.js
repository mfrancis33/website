module.exports = separate => {
	return require("../navbuilder")(separate, "projects", __dirname + "/pages")
};