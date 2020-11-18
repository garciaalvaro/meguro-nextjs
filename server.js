const express = require("express");
const next = require("next");
const { existsSync } = require("fs");
const glob = require("glob");
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

const assets_dirs = glob.sync(`${content_dir}/pages/*/assets`);

// We use a custom server to be able to add a custom static directory
app.prepare().then(() => {
	const server = express();

	assets_dirs.forEach(dir => {
		const root = dir.split("/").slice(-2)[0];

		server.use(
			`/${root}/assets`,

			express.static(
				path.resolve(
					__dirname,
					`.next/responsive-images/${root}/assets`
				)
			)
		);
	});

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
