function display_message(msg) {
	let msg_div = document.createElement("div");
	msg_div.innerText = msg.author + " : " + msg.content;
	msg_div.className = "msg";
	document.body.insertBefore(msg_div, last_div);
}

function send_message(e) {
	if (e.code === "Enter" && input.value !== "") {
		let buf = Buffer.from(JSON.stringify({ content: input.value, author: username }));
		client.write(buf);
		buf = null;
		input.value = "";
	}
}

const net = require("net");
const PORT = 1337;
const HOST = "192.168.0.43";
const client = net.createConnection(PORT, HOST, () => console.log("client connected"));

const last_div = document.getElementById("last_div");
const input = document.getElementById("msg_input");

let username = sessionStorage.getItem("username");

input.onkeydown = send_message;
client.on("data", (data) => {
	client.bytesRead;
	display_message(JSON.parse(data.toString()));
});
client.on("end", () => console.log("disconnected from server"));
