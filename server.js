const express = require("express");
const next = require("next");
const { existsSync } = require("fs");
const path = require("path");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const use_demo = !existsSync(path.resolve(__dirname, "./content"));

const content_dir = use_demo
	? path.resolve(__dirname, "./content-demo")
	: path.resolve(__dirname, "./content");

const assets_dir = existsSync(path.resolve(content_dir, "assets"))
	? path.resolve(content_dir, "assets")
	: null;

// We use a custom server to be able to add a custom static directory
app.prepare().then(() => {
	const server = express();

	if (assets_dir) {
		server.use(express.static(assets_dir));
	}

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
