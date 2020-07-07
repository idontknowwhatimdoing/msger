const input = document.querySelector("input");

input.onkeydown = (e) => {
	if (e.code === "Enter" && input.value !== "") {
		sessionStorage.setItem("username", input.value);
		document.location = "../public/chat.html";
	}
};
