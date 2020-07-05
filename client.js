function display_message(msg) {
	let msg_div = document.createElement("div");
	msg_div.innerText = msg;
	msg_div.className = "msg";
	document.body.insertBefore(msg_div, last_div);
}

function send_message(e) {
	if (e.code === "Enter" && input.value !== "") {
		client.write(input.value);
		input.value = "";
	}
}

const net = require("net");
const PORT = 1337;
const HOST = "localhost";
const client = net.createConnection(PORT, HOST, () => console.log("client connected"));

const last_div = document.getElementById("last_div");
const input = document.querySelector("input");

input.onkeydown = send_message;
client.on("data", (data) => display_message(data.toString()));
client.on("end", () => console.log("disconnected from server"));
