"use strict";

function logout() {
	sessionStorage.clear();
	document.location = "./login.html";
}

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

const { Buffer } = require("buffer");
const net = require("net");
const client = net.createConnection(1337, "192.168.0.43");
const input = document.querySelector("#msg_input");
const logout_img = document.querySelector("img[id='logout']");
let username = sessionStorage.getItem("username");

logout_img.onclick = logout;
input.onkeydown = send_message;
client.on("data", (data) => {
	console.log("reading :", client.bytesRead);
	display_message(JSON.parse(data.toString()));
});
client.on("drain", () => console.log("drain event"));
client.on("error", (e) => console.error("error :", e));
client.on("end", () => console.log("disconnected from server"));
