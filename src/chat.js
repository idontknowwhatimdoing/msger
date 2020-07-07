function display_message(msg) {
	let msg_div = document.createElement("div");
	msg_div.innerText = msg.author + " : " + msg.content;
	msg_div.className = "msg";
	document.body.insertBefore(msg_div, document.getElementById("last_div"));
}

function send_message(e) {
	if (e.code === "Enter" && input.value !== "") {
		let buf = Buffer.from(JSON.stringify({ content: input.value, author: username }));
		client.write(buf);
		console.log("writing :", client.bytesWritten);
		input.value = "";
	}
}

const net = require("net");
const PORT = 1337;
const HOST = "192.168.0.21";
const client = net.createConnection(PORT, HOST, () => console.log("client connected"));
const input = document.getElementById("msg_input");
let username = sessionStorage.getItem("username");

input.onkeydown = send_message;
client.on("data", (data) => {
	console.log("reading :", client.bytesRead);
	display_message(JSON.parse(data.toString()));
});
client.on("drain", () => console.log("drain event"));
client.on("error", (e) => console.error("error :", e));
client.on("end", () => console.log("disconnected from server"));
