"use strict";

const net = require("net");
let clients = [];

const server = net.createServer((client) => {
	console.log("new connection : ", client.remoteAddress + ":" + client.remotePort);
	clients.push(client);

	client.on("data", (data) => {
		console.log(client.remoteAddress + ":" + client.remotePort, ":", data.toString());
		for (const c of clients) c.write(data);
	});
	client.on("end", () => {
		console.log(client.remoteAddress + ":" + client.remotePort, "disconnected");
		clients.splice(clients.indexOf(client), 1);
	});
	client.on("error", (e) => console.log("error :", e));
});

server.on("error", (e) => console.error("error :", e));
server.listen(1337, "192.168.0.43", () => console.log("waiting for connections ..."));
