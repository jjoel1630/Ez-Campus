if (document.readyState !== "complete") {
	window.addEventListener("load", afterWindowLoaded);
} else {
	afterWindowLoaded();
}

function afterWindowLoaded() {
	setTimeout(() => {
		//Everything that needs to happen after the window is fully loaded.
		//Everything that needs to happen after the DOM has initially loaded.
		const form = document.createElement("div");
		form.innerText = "test";
		const containerDiv = document.querySelector(".ng-tns-c426-3 > #document");
		// containerDiv.innerHTML = `${form}${containerDiv.innerHTML}`;
		// containerDiv.innerHTML = `<h1>test</h1>`;
		console.log(containerDiv);
	}, 8000);
}
