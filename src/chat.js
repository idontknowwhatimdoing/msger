"use strict";

function debug() {
	display_user("test");
}

function logout() {
	sessionStorage.clear();
	client.end();
	document.location = "../public/login.html";
}

function go_back() {
	if (pseudo !== "all") document.location = "../public/chat.html?pseudo=all";
}

function display_message(msg) {
	let msg_div = document.createElement("div");
	msg_div.innerText = msg.author + " : " + msg.content;
	msg_div.className = "msg";
	msg_list.insertBefore(msg_div, last_msg);
	document.location = "./chat.html#last";
	input.focus();
}

function display_user(pseudo) {
	let user_div = document.createElement("div");
	user_div.innerText = pseudo;
	user_div.className = "user";
	user_div.onclick = () => (document.location = `../public/chat.html?pseudo=${pseudo}`);
	userlist.insertBefore(user_div, last_user);
}

function send_message(e) {
	if (e.code === "Enter" && input.value !== "") {
		client.write(
			Buffer.from(JSON.stringify({ content: input.value.trim(), from: pseudo, to: dest }))
		);
		input.value = "";
	}
}

function handle_msg(msg) {
	if ("pseudo" in msg) display_user(msg.pseudo);
	else if ("content" in msg && "author" in msg) display_message(msg);
	else if ("error" in msg) if (msg.error === "invalid pseudo") alert(msg.error);
}

const dest = new URL(location).searchParams.get("pseudo");
let pseudo = sessionStorage.getItem("pseudo");
const { Buffer } = require("buffer");
const net = require("net");
const client = net.createConnection(1337, "192.168.0.43", () =>
	client.write(Buffer.from(JSON.stringify({ pseudo })))
);
const input = document.querySelector("#msg-input");
const goback = document.querySelector("#go-back");
const deco = document.querySelector("#deco");
const msg_list = document.querySelector(".msg-list");
const userlist = document.querySelector(".userlist");
const last_msg = document.querySelector("#last-msg");
const last_user = document.querySelector("#last-user");

goback.onclick = go_back;
deco.onclick = logout;
userlist.onclick = debug;
input.onkeydown = send_message;
client.on("data", (data) => handle_msg(JSON.parse(data.toString())));
client.on("error", (e) => console.error("error :", e));
client.on("end", () => logout());
