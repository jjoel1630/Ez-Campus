// if (localStorage.getItem("grades")) {
// 	console.log(localStorage.getItem("grades"));
// } else {
// 	setTimeout(() => {
// 		const iframeContainer = document.getElementById("main-workspace");
// 		// console.log(iframeContainer);
// 		// iframeContainer.contentWindow.addEventListener("load", (e) => {
// 		// 	console.log("****** iframe loaded", e.target);
// 		// 	const iframeRoot = e.target;
// 		// 	const iframeHtmlBody = iframeRoot.contentWindow.getElementsByTagName("div");
// 		// 	console.log("****** iframe body", iframeHtmlBody);

// 		// 	console.log(e.target);
// 		// });

// 		const arrayOfCategories = [];
// 		const localStorageObj = {};

// 		const title = iframeContainer.contentWindow.document
// 			.querySelector(".card__header.sticky.z-10")
// 			.textContent.trim();

// 		localStorageObj[`${title}`] = [];

// 		iframeContainer.contentWindow.document
// 			.querySelectorAll(".divider__header")
// 			.forEach((item, idx) => {
// 				arrayOfCategories.push({});

// 				const nameAndWeight = item.querySelectorAll("div")[0].textContent;
// 				arrayOfCategories[idx].name = nameAndWeight.split(":")[0].trim();
// 				arrayOfCategories[idx].weight = nameAndWeight.split(":")[1].trim();

// 				const gradeScore = item.querySelectorAll(".totals__row--assignment > div")[0]
// 					.textContent;
// 				const gradePercent = item.querySelectorAll(".totals__row--assignment > div")[1]
// 					.textContent;
// 				arrayOfCategories[idx].score = gradeScore.trim();
// 				arrayOfCategories[idx].percent = gradePercent.trim();
// 			});
// 		// localStorageObj[`${title}`] = arrayOfCategories;
// 		// console.log(localStorageObj);
// 		// localStorage.setItem("grades");
// 	}, 10000);
// }

setTimeout(() => {
	const iframeContainer = document.getElementById("main-workspace");
	// console.log(iframeContainer);
	// iframeContainer.contentWindow.addEventListener("load", (e) => {
	// 	console.log("****** iframe loaded", e.target);
	// 	const iframeRoot = e.target;
	// 	const iframeHtmlBody = iframeRoot.contentWindow.getElementsByTagName("div");
	// 	console.log("****** iframe body", iframeHtmlBody);

	// 	console.log(e.target);
	// });

	const arrayOfCategories = [];
	const localStorageObj = {};

	const title = iframeContainer.contentWindow.document
		.querySelector(".card__header.sticky.z-10")
		.textContent.trim();

	localStorageObj[`${title}`] = [];

	iframeContainer.contentWindow.document
		.querySelectorAll(".divider__header")
		.forEach((item, idx) => {
			arrayOfCategories.push({});

			const nameAndWeight = item.querySelectorAll("div")[0].textContent;
			arrayOfCategories[idx].name = nameAndWeight.split(":")[0].trim();
			arrayOfCategories[idx].weight = nameAndWeight.split(":")[1].trim();

			const gradeScore = item.querySelectorAll(".totals__row--assignment > div")[0]
				.textContent;
			const gradePercent = item.querySelectorAll(".totals__row--assignment > div")[1]
				.textContent;
			arrayOfCategories[idx].score = gradeScore.trim();
			arrayOfCategories[idx].percent = gradePercent.trim();
		});
	// localStorageObj[`${title}`] = arrayOfCategories;
	// console.log(localStorageObj);
	// localStorage.setItem("grades");
}, 10000);
