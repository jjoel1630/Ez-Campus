if (document.readyState !== "complete") {
	window.addEventListener("load", afterWindowLoaded);
} else {
	afterWindowLoaded();
}

function afterWindowLoaded() {
	setTimeout(() => {
		let extensionID = "gekdfbljcjbnkhmmophbpbnapjpcicno";
		let elementTOUpdate = $(".workspace").get();
		console.log(elementTOUpdate);
	}, 8000);
}
