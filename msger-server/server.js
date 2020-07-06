const net = require("net");
const PORT = 1337;
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
server.listen(PORT, () => console.log("server listening on port", PORT, "..."));
