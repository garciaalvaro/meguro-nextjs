const express = require("express");
const { existsSync } = require("fs");
const path = require("path");

const { base_url_path, port } = require("../config");
const base_url_path_with_slash = base_url_prefix ? `/${base_url_prefix}/` : "/";

const server = express();
const page_404 = path.resolve(__dirname, "../out/404.html");

// Serve files in the out directory as static
server.use(base_url_path, express.static(path.resolve(__dirname, "../out")));

// TODO: Improve
server.use(
	`${base_url_path_with_slash}:project`,

	({ params: { project } }, res) => {
		const project_file = path.resolve(__dirname, `../out/${project}.html`);

		if (existsSync(project_file)) {
			res.sendFile(project_file);
		} else {
			res.sendFile(page_404);
		}
	}
);

server.listen(port, err => {
	if (err) throw err;

	console.log(`> Ready on http://localhost:${port}${base_url_path}`);
});
