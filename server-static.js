const express = require("express");
const { existsSync } = require("fs");
const path = require("path");

const serve = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const DIRECTORY_OUT = path.resolve(__dirname, "out");

const use_demo =
	!existsSync(path.resolve(__dirname, "./content")) || process.env.USE_DEMO;

const { url_path_prefix } = use_demo
	? require("./content-demo/config")
	: require("./content/config");

serve.use(url_path_prefix ? `/${url_path_prefix}` : "/", express.static("out"));

const page_404 = path.resolve(DIRECTORY_OUT, "404.html");

// TODO: Improve
serve.use(
	url_path_prefix ? `/${url_path_prefix}/:project` : "/:project",
	(req, res) => {
		const project = path.resolve(
			DIRECTORY_OUT,
			`${req.params.project}.html`
		);

		if (existsSync(project)) {
			res.sendFile(project);
		} else {
			res.sendFile(page_404);
		}
	}
);

serve.listen(port, err => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${port}`);
});
