// chrome.webRequest.onCompleted.addListener(
// 	(details) => {
// 		const parsedUrl = new URL(details.url);
// 		console.log(parsedUrl);
// 		if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
// 			chrome.tabs.sendMessage(tabId, { type: "page-rendered" });
// 			let lastHref = location.href;
// 			setInterval(() => {
// 				console.log(document.querySelectorAll(".workspace-content--with-toolbar"));
// 			}, 250);
// 		}
// 	},
// 	{ urls: ["*://*.org/*"] }
// );
