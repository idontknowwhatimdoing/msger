"use strict";

const net = require("net");
const PORT = 1337;
const HOST = "192.168.0.43";
let clients = [];

const server = net.createServer((client) => {
	console.log("new connection : ", client.remoteAddress + ":" + client.remotePort);
	clients.push(client);

	client.on("data", (data) => {
		console.log(client.remoteAddress + ":" + client.remotePort, ":", data.toString());
		console.log("reading :", client.bytesRead);
		for (let c of clients) {
			c.write(data);
			console.log("writing :", client.bytesWritten);
		}
	});
	client.on("end", () => {
		console.log(client.remoteAddress + ":" + client.remotePort, "disconnected");
		clients.splice(clients.indexOf(client), 1);
	});
	client.on("error", (e) => {
		console.log("error :", e);
		clients.splice(clients.indexOf(client), 1);
	});
	client.on("drain", () => console.log("drain event"));
});

server.on("error", (e) => console.error("error :", e));
server.listen(PORT, HOST, () =>
	console.log("server listening on", HOST + ":" + PORT, "...")
);
