const net = require("net");
const PORT = 1337;
const HOST = "192.168.0.21";
let clients = [];

const server = net.createServer((client) => {
	console.log("new connection : ", client.remoteAddress + ":" + client.remotePort);
	clients.push(client);

	client.on("data", (data) => {
		console.log(client.remoteAddress + ":" + client.remotePort, ":", data.toString());
		console.log("reading :", client.bytesRead);
		for (const c of clients) {
			c.write(data);
			console.log("writing :", c.bytesWritten);
		}
	});

	client.on("end", () => {
		console.log(client.remoteAddress + ":" + client.remotePort, "disconnected");
		clients.splice(clients.indexOf(client), 1);
	});
});

server.on("error", (err) => console.error(err));
server.listen(PORT, HOST, () => console.log("server listening on port", PORT, "..."));
