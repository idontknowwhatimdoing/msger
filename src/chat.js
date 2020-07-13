"use strict";

function logout() {
	sessionStorage.clear();
	client.end();
	document.location = "./login.html";
}

function display_message(msg) {
	let msg_div = document.createElement("div");
	msg_div.innerText = msg.author + " : " + msg.content;
	msg_div.className = "msg";
	msg_list.insertBefore(msg_div, last_div);
	document.location = "./chat.html#last";
	input.focus();
}

function send_message(e) {
	if (e.code === "Enter" && input.value !== "") {
		client.write(Buffer.from(JSON.stringify({ content: input.value.trim(), dest: "all" })));
		input.value = "";
	}
}

let pseudo = sessionStorage.getItem("pseudo");
const { Buffer } = require("buffer");
const net = require("net");
const client = net.createConnection(1337, "192.168.0.43", () =>
	client.write(Buffer.from(JSON.stringify({ pseudo })))
);
const input = document.querySelector("#msg-input");
const logout_img = document.querySelector("#logout");
const msg_list = document.querySelector(".msg-list");
const last_div = document.querySelector("#last");

logout_img.onclick = logout;
input.onkeydown = send_message;
client.on("data", (data) => display_message(JSON.parse(data.toString())));
client.on("error", (e) => console.error("error :", e));
client.on("end", () => logout());
