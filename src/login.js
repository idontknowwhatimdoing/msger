"use strict";

const input = document.querySelector("input[id='username_input']");

input.onkeydown = (e) => {
	if (e.code === "Enter" && input.value !== "") {
		sessionStorage.setItem("username", input.value);
		document.location = "../public/chat.html";
	}
};
