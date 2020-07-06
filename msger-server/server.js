const net = require("net");
const PORT = 1337;
let clients = [];

const server = net.createServer((client) => {
	console.log("new connection : ", client.remoteAddress);
	clients.push(client);

	client.on("data", (data) => {
		console.log(client.remoteAddress, ":", data.toString());
		for (const c of clients) {
			if (c.write(data)) console.log("ok");
			else console.log("not ok");
			console.log(c.bytesWritten);
		}
	});

	client.on("end", () => {
		console.log(client.remoteAddress, "disconnected");
		clients.splice(clients.indexOf(client), 1);
	});
});

server.on("error", (err) => console.error(err));
server.listen(PORT, () => console.log("server listening on port", PORT, "..."));
