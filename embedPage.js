if (document.readyState !== "complete") {
	window.addEventListener("load", afterWindowLoaded);
} else {
	afterWindowLoaded();
}

function afterWindowLoaded() {
	// while
	setTimeout(() => {
<<<<<<< HEAD
		//Everything that needs to happen after the window is fully loaded.
		//Everything that needs to happen after the DOM has initially loaded.
		const form = document.createElement("div");
		form.innerText = "test";
		const containerDiv = document.querySelector("ic-work");
		// containerDiv.innerHTML = `${form}${containerDiv.innerHTML}`;
		// containerDiv.innerHTML = `<h1>test</h1>`;
		console.log(containerDiv);
=======
		let extensionID = "gekdfbljcjbnkhmmophbpbnapjpcicno";
		let elementTOUpdate = $(".workspace").get();
		console.log(elementTOUpdate);
>>>>>>> 3b502ded04a5944a75992f40e9933e3ac95b6e30
	}, 8000);
}
