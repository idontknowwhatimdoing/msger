"use strict";

function login(e) {
	if (e.code === "Enter" && input.value !== "") {
		sessionStorage.setItem("pseudo", input.value.trim());
		document.location = "../public/chat.html?pseudo=all";
	}
}

const input = document.querySelector("#pseudo-input");

input.onkeydown = login;
