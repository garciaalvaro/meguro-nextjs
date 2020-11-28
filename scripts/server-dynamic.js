const express = require("express");
const { existsSync } = require("fs");
const next = require("next");
const glob = require("glob");
const path = require("path");

const { getContentDir, port } = require("../config");
const is_development = process.env.NODE_ENV !== "production";
const server = next({ dev: is_development });
const handle = server.getRequestHandler();

const content_dir = getContentDir(__dirname);
const pages_dirs = glob.sync(`${content_dir}/pages/*`);
const assets_dirs = glob.sync(`${content_dir}/assets`);

// We use a custom server in order to add custom static directories
server.prepare().then(() => {
	const server = express();

	pages_dirs.forEach(dir => {
		const project_root = dir.split("/").slice(-2)[0];

		server.use(
			// Needs to be the file path to work in the static server
			`${base_url_path}_next/static/images/${root}`,

			express.static(
				path.resolve(
					project_root,
					`.next/static/images/${project_root}`
				)
			)
		);
	});

	if (existsSync(assets_dirs)) {
		server.use(express.static(assets_dirs));
	}

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;

		console.log(`> Ready on http://localhost:${port}`);
	});
});
