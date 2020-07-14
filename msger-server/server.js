"use strict";

function is_valid(pseudo) {
	for (const c of clients) if (c.pseudo === pseudo) return false;
	return pseudo !== "all";
}

function get_pseudo(client) {
	for (const c of clients) if (c.sock === client) return c.pseudo;
}

function handle_msg(client, msg) {
	if ("pseudo" in msg) {
		if (is_valid(msg.pseudo)) {
			for (const c of clients)
				c.sock.write(Buffer.from(JSON.stringify({ pseudo: msg.pseudo })));
			for (const c of clients)
				client.write(Buffer.from(JSON.stringify({ pseudo: c.pseudo })));
			clients.push({ sock: client, pseudo: msg.pseudo });
		} else client.end(JSON.stringify({ error: "invalid pseudo" }));
	} else if ("content" in msg && "dest" in msg) {
		if (msg.dest === "all") {
			for (const c of clients)
				c.sock.write(
					Buffer.from(
						JSON.stringify({ content: msg.content, author: get_pseudo(client) })
					)
				);
		} else {
			for (const c of clients)
				if (c.pseudo === msg.dest)
					c.sock.write(
						Buffer.from(
							JSON.stringify({ content: msg.content, author: get_pseudo(client) })
						)
					);
			client.write(
				Buffer.from(JSON.stringify({ content: msg.content, author: get_pseudo(client) }))
			);
		}
	}
}

const { Buffer } = require("buffer");
const net = require("net");
let clients = [];

const server = net.createServer((client) => {
	console.log("new connection : ", client.remoteAddress + ":" + client.remotePort);

	client.on("data", (data) => handle_msg(client, JSON.parse(data.toString())));
	client.on("end", () => {
		console.log(client.remoteAddress + ":" + client.remotePort, "disconnected");
		clients.splice(clients.indexOf(client), 1);
		client.end();
	});
	client.on("error", (e) => console.log("client error :", e));
});

server.on("error", (e) => console.error("server error :", e));
server.listen(1337, "192.168.0.43", () => console.log("waiting for connections ..."));
