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

chrome.runtime.onMessage.addListener((request) => {
	if (request && request.type === "page-rendered") {
		// call method which gets fired as if new page is opened
		afterwindowLoaded();
	}
});
