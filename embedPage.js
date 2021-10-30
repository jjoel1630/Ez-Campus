// if (document.readyState !== "complete") {
// 	window.addEventListener("load", afterWindowLoaded);
// } else {
// 	afterWindowLoaded();
// }

// function afterWindowLoaded() {
// 	setTimeout(() => {
// 		let extensionID = "gekdfbljcjbnkhmmophbpbnapjpcicno";
// 		let elementTOUpdate = $(".workspace").get();
// 		console.log(elementTOUpdate);
// 	}, 8000);
// }

function afterwindowLoaded() {
	let elementTOUpdate = $(".workspace").get();
	console.log(elementTOUpdate);
}

function afterWindowLoaded() {
	// while
	setTimeout(() => {
		//Everything that needs to happen after the window is fully loaded.
		//Everything that needs to happen after the DOM has initially loaded.
		const form = document.createElement("div");
		form.innerText = "test";
		const containerDiv = document.querySelector("ic-work");
		// containerDiv.innerHTML = `${form}${containerDiv.innerHTML}`;
		// containerDiv.innerHTML = `<h1>test</h1>`;
		console.log(containerDiv);
		let extensionID = "gekdfbljcjbnkhmmophbpbnapjpcicno";
		let elementTOUpdate = $(".workspace").get();
		console.log(elementTOUpdate);
	}, 8000);
}

chrome.runtime.onMessage.addListener((request) => {
	if (request && request.type === "page-rendered") {
		// call method which gets fired as if new page is opened
		afterwindowLoaded();
	}
});
