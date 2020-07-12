"use strict";

function login(e) {
	if (e.code === "Enter" && input.value !== "") {
		sessionStorage.setItem("pseudo", input.value.trim());
		document.location = "../public/chat.html";
	}
}

const input = document.querySelector("input[id='pseudo_input']");

input.onkeydown = login;
