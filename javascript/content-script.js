// setTimeout(() => {
// 	const iframeContainer = document.getElementById("main-workspace");

// 	if (
// 		iframeContainer.contentWindow.document
// 			.querySelector(".k-button")
// 			?.getAttribute("aria-pressed")
// 	) {
// 		const mDiv = document.createElement("div");
// 		const header = document.createElement("h2");
// 		header.textContent = "Please choose a quarter for this extension to work!";
// 		mDiv.append(header);
// 		css(mDiv, {
// 			width: "100%",
// 			height: "4rem",
// 			display: "flex",
// 			"justify-content": "center",
// 			"align-items": "center",
// 		});
// 		iframeContainer.contentWindow.document.querySelector(".workspace-content").prepend(mDiv);

// 		const len = iframeContainer.contentWindow.document.querySelectorAll(
// 			".pill-button-group.k-button-group > button"
// 		).length;

// 		iframeContainer.contentWindow.document
// 			.querySelectorAll(".pill-button-group.k-button-group > button")
// 			[len - 1].addEventListener("click", (e) => {
// 				// console.log("in e listener");
// 				mDiv.style.display = "none";
// 			});

// 		return;
// 	}
// });

// let button;
// setTimeout(() => {
// 	const iframeContainer = document.getElementById("main-workspace");
// 	const t = iframeContainer.contentWindow.document.querySelectorAll(
// 		".pill-button-group.k-button-group > button"
// 	);
// 	button = t[t.length - 1];
// 	console.log(button);
// }, 10000);

setTimeout(() => {
	localStorage.clear();
	// CSS FUNCTION TO QUICKLY ADD CSS FOR AN ELEMENT
	function css(element, style) {
		for (const property in style) element.style[property] = style[property];
	}
	// GET THE IFRAME
	const iframeContainer = document.getElementById("main-workspace");
	const arrayOfCategories = []; // the array of categories
	const localStorageObj = {}; // local storage object for storing the info in local storage

	// GET TITLE OF THE COURSE
	const title = iframeContainer.contentWindow.document
		.querySelector(".card__header.sticky.z-10")
		.textContent.trim();

	// SET A LOCAL STORAGE OBJECT VALUE TO THE TITLE OF THE COURSE
	localStorageObj[`${title}`] = [];

	// LOOP OVER THE CONTAINER DIVS
	iframeContainer.contentWindow.document
		.querySelectorAll("button.divider__header")
		.forEach((item, idx) => {
			arrayOfCategories.push({});

			// GET NAME AND WEIGHT OF THE CLASS ITSELF
			const nameAndWeight = item.querySelectorAll("div")[0].textContent;
			console.log(nameAndWeight);
			arrayOfCategories[idx].name = nameAndWeight.split(":")[0].trim();
			arrayOfCategories[idx].weight = nameAndWeight.split(":")[1].trim();

			// GET FRACTIONAL SCORE AND PERCENT OF THE CLASS ITSELF
			const gradeScore = item.querySelectorAll(".totals__row--assignment > div")[0]
				.textContent;
			const gradePercent = item.querySelectorAll(".totals__row--assignment > div")[1]
				.textContent;
			arrayOfCategories[idx].score = gradeScore.trim();
			arrayOfCategories[idx].percent = gradePercent.trim();
		});

	localStorageObj[`${title}`] = arrayOfCategories;
	localStorage.setItem("course_info", JSON.stringify(localStorageObj));

	// FORM COMPONENT
	const form = document.createElement("form");

	// SELECT COMPONENT
	const selectCategories = document.createElement("select");
	const defaultOption = document.createElement("option");
	defaultOption.value = "default";
	defaultOption.textContent = "Please choose a category";
	selectCategories.appendChild(defaultOption);
	for (let i = 0; i < arrayOfCategories.length; i++) {
		const option = document.createElement("option");
		option.value = arrayOfCategories[i].name;
		option.textContent = arrayOfCategories[i].name;
		selectCategories.appendChild(option);
	}
	selectCategories.id = "category-unique-id";

	// SCORE COMPONENT
	const scoreInput = document.createElement("input");
	scoreInput.type = "text";
	scoreInput.placeholder = "Enter your score here";
	scoreInput.id = "grade-unique-id";

	const firstScoreInput = document.createElement("input");
	firstScoreInput.type = "number";
	firstScoreInput.id = "first-score-unique-id";

	const secondScoreInput = document.createElement("input");
	secondScoreInput.type = "number";
	secondScoreInput.id = "second-score-unique-id";

	// NAME COMPONENT
	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.placeholder = "Name of your assignment/test";
	nameInput.id = "name-unique-id";

	// SUBMIT COMPONENT
	const submit = document.createElement("input");
	submit.type = "submit";
	submit.value = "submit";

	// APPEND VALS
	form.appendChild(selectCategories);
	form.appendChild(nameInput);
	// form.appendChild(scoreInput);
	form.appendChild(firstScoreInput);
	form.appendChild(secondScoreInput);
	form.appendChild(submit);

	css(form, {
		width: "100%",
		height: "4rem",
		display: "flex",
		"justify-content": "center",
		"align-items": "center",
	});
	css(selectCategories, { "margin-right": "0.5rem", height: "2rem" });
	css(nameInput, { "margin-right": "0.5rem", padding: "0.3rem 0.5rem", height: "2rem" });
	css(scoreInput, { "margin-right": "0.5rem", padding: "0.3rem 0.5rem", height: "2rem" });
	css(firstScoreInput, { "margin-right": "0.5rem", padding: "0.3rem 0.5rem", height: "2rem" });
	css(secondScoreInput, { "margin-right": "0.5rem", padding: "0.3rem 0.5rem", height: "2rem" });
	css(submit, {
		padding: "5px 15px",
		height: "auto",
		"background-color": "#99e0b2",
		border: "0 none",
		cursor: "pointer",
		"border-radius": "5px",
		height: "2rem",
	});

	// ADDED ASSIGNMENTS COMPONENT
	const addedAssignments = document.createElement("div");
	const assignmentHeader = document.createElement("h3");
	assignmentHeader.textContent = "No added assignments.";
	addedAssignments.appendChild(assignmentHeader);
	css(addedAssignments, { "margin-left": "2rem" });

	// CALCULATED GRADE COMPONENT
	const newGrade = document.createElement("div");
	const newGradeGrade = document.createElement("h2");
	let grade = iframeContainer.contentWindow.document.querySelector(
		".grading-score__row-spacing"
	).textContent;
	grade = grade.substring(1, grade.length - 1);
	newGradeGrade.textContent = `Calculated Grade: ${grade.slice(1, -1)}`;
	newGrade.appendChild(newGradeGrade);
	addedAssignments.prepend(newGrade);

	// ADD ASSIGNMENTS + FORM TO THE IFRAME
	iframeContainer.contentWindow.document
		.querySelector(".workspace-content")
		.prepend(addedAssignments);
	iframeContainer.contentWindow.document.querySelector(".workspace-content").prepend(form);

	// WHEN FORM IS SUBMITTED
	form.addEventListener("submit", (event) => {
		// PREVENT RELOAD
		event.preventDefault();

		// CHECK IF A VALUE IS A FRACTION OR NOT
		// if (
		// 	iframeContainer.contentWindow.document
		// 		.querySelector("#grade-unique-id")
		// 		.value.indexOf("/") === -1
		// ) {
		// 	console.log("value must be a fraction!");
		// 	return;
		// }

		// CREATE NEW ASSIGNMENT
		const newAssignment = document.createElement("div");
		// GET ASSIGNMENT NAME VALUE FROM FORM
		const name = document.createElement("h4");
		name.textContent =
			iframeContainer.contentWindow.document.querySelector("#name-unique-id").value;
		// GET ASSIGNMENT SCORE VALUE FROM FORM
		const score = document.createElement("p");
		score.textContent =
			iframeContainer.contentWindow.document.querySelector("#first-score-unique-id").value +
			"/" +
			iframeContainer.contentWindow.document.querySelector("#second-score-unique-id").value;
		// score.textContent =
		// 	iframeContainer.contentWindow.document.querySelector("#grade-unique-id").value;
		// GET ASSIGNMENT SCORE VALUE FROM FORM
		const category = document.createElement("p");
		category.textContent =
			iframeContainer.contentWindow.document.querySelector("#category-unique-id").value;

		if (category.textContent === "default") {
			console.log("please choose a category");
			return;
		}

		css(name, { "margin-right": "3rem" });
		css(score, { "margin-right": "3rem" });

		let newLocalStorage = [];
		let scoreObj; // the score from the object
		let weight; // the weight of the category
		let totalGrade = 0; // the total grade for the class
		let totalWeight = 0; // the total weight to check because some teacher hide some categories
		JSON.parse(localStorage.getItem("course_info"))[`${title}`].forEach((obj, idx) => {
			newLocalStorage.push({});
			// IF THE CATEGORY IS THE OBJECT NAME --> THE ASSIGNMENT IS ADDED TO THAT CATEGORY
			if (obj.name === category.textContent) {
				// SPLIT THE SCORE PROPERTY FROM THE MAIN OBJECT
				scoreObj = obj.score;
				scoreObj = scoreObj.split("/");

				// GET THE WEIGHT PROPERTY FROM THE MAIN OBJECT
				weight = parseInt(obj.weight);
				totalWeight += weight;

				// GET TOTAL POSSIBLE POINTS AND TOTAL POINTS EARNED TO DIVIDE THEM
				let totalPtsPossible =
					parseInt(scoreObj[1]) + parseInt(score.textContent.split("/")[1]);
				let totalPtsEarned =
					parseInt(scoreObj[0]) + parseInt(score.textContent.split("/")[0]);

				newLocalStorage[idx].score = `${totalPtsEarned}/${totalPtsPossible}`;

				// CALCULATE THE PERCENT OF THE WEIGHTAGE
				let weightGrade = weight * (totalPtsEarned / totalPtsPossible / 100);
				newLocalStorage[idx].percent = `(${(
					(totalPtsEarned / totalPtsPossible) *
					100
				).toFixed(2)}%)`;

				newLocalStorage[idx].name = obj.name;
				newLocalStorage[idx].weight = obj.weight;

				// ADD THE WEIGHT GRADE TO THE TOTAL GRADE
				// totalGrade += weightGrade;
			} else {
				// IF THE CATEGORY THAT IS ADDED IS NOT THE OBJECT
				// GET PERCENT OF THE OBJECT
				let objPercent = obj.percent.slice(1);
				objPercent = objPercent.slice(0, -2);
				objPercent = parseFloat(objPercent);

				// WEIGHT OF THE OBJECT
				let w = parseInt(obj.weight);
				// ADD IT TO THE TOTAL WEIGHT BECAUSE NOTHING CHANGES
				totalWeight += w;
				let weightGrade = w * (objPercent / 100);

				// ADD THE WEIGHT GRADE (STAYS THE SAME) TO THE TOTAL GRADE
				// totalGrade += weightGrade;

				newLocalStorage[idx].name = obj.name;
				newLocalStorage[idx].weight = obj.weight;
				newLocalStorage[idx].score = obj.score;
				newLocalStorage[idx].percent = obj.percent;
			}
		});
		// IF TEACHER HAS NOT ADDED A CATEGOY, THEN IT IS BBY DEFAULT 100%, SO JUST ADD THE REMAINING VALUE
		totalGrade = 0;
		newLocalStorage.forEach(({ weight, percent }, idx) => {
			totalGrade += parseInt(weight) * parseFloat(parseFloat(percent.slice(1, -2)));
		});
		totalGrade = totalGrade / totalWeight;
		newGradeGrade.textContent = `Calculated Grade: ${totalGrade.toFixed(2)}%`;
		let t = {};
		t[`${title}`] = newLocalStorage;
		localStorage.setItem("course_info", JSON.stringify(t));

		// ADD THE NEW ASSIGNMENT TO THE DOM
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "delete";

		newAssignment.appendChild(name);
		newAssignment.appendChild(score);
		newAssignment.appendChild(category);
		newAssignment.appendChild(deleteButton);

		newAssignment.id = `${name.textContent.split().join("-")}`;

		// CHANGE THE CONTENT FROM NO ASSIGNMENTS TO ADDED ASSIGNMENTS
		assignmentHeader.textContent = "Added Assignments:";
		addedAssignments.appendChild(newAssignment);

		css(newAssignment, { display: "flex" });

		deleteButton.addEventListener("click", (e) => {
			const deleteNewLocalStorage = [];
			JSON.parse(localStorage.getItem("course_info"))[`${title}`].forEach((obj, idx) => {
				deleteNewLocalStorage.push({});
				if (obj.name === e.path[1].querySelectorAll("p")[1].textContent) {
					let curScore = e.path[1].querySelectorAll("p")[0].textContent;
					let curScorePts = curScore.split("/")[0];
					let curScoreTotalPts = curScore.split("/")[1];

					let prevScore = obj.score;
					let prevScorePts = prevScore.split("/")[0];
					let prevScoreTotalPts = prevScore.split("/")[1];

					deleteNewLocalStorage[idx].score = `${prevScorePts - curScorePts}/${
						prevScoreTotalPts - curScoreTotalPts
					}`;

					deleteNewLocalStorage[idx].percent = `(${(
						((prevScorePts - curScorePts) / (prevScoreTotalPts - curScoreTotalPts)) *
						100
					).toFixed(2)}%)`;

					deleteNewLocalStorage[idx].weight = obj.weight;
					deleteNewLocalStorage[idx].name = obj.name;
				} else {
					deleteNewLocalStorage[idx].weight = obj.weight;
					deleteNewLocalStorage[idx].name = obj.name;
					deleteNewLocalStorage[idx].score = obj.score;
					deleteNewLocalStorage[idx].percent = obj.percent;
				}
			});

			let deleteNewTotalGrade = 0;
			let deleteNewTotalWeightage = 0;
			deleteNewLocalStorage.forEach(({ weight, percent }, idx) => {
				deleteNewTotalGrade +=
					parseInt(weight) * parseFloat(parseFloat(percent.slice(1, -2)));
				deleteNewTotalWeightage += parseInt(weight);
			});
			deleteNewTotalGrade = deleteNewTotalGrade / deleteNewTotalWeightage;
			newGradeGrade.textContent = `Calculated Grade: ${deleteNewTotalGrade.toFixed(2)}%`;
			let dt = {};
			dt[`${title}`] = deleteNewLocalStorage;
			localStorage.setItem("course_info", JSON.stringify(dt));

			// const score = obj.score;
			// const pts = e.path[1].querySelector("p")[0].textContent.split("/")[0];
			// const totalPts = e.path[1].querySelector("p")[0].textContent.split("/")[1];

			// obj.percent = `(${
			// 	(parseInt(score.split("/")[0]) - parseInt(pts)) /
			// 	(parseInt(score.split("/")[1]) - parseInt(totalPts))
			// }%)`;

			// const scorePts = parseInt(score.split("/")[0]) - parseInt(pts);
			// const scoreTotalPts = parseInt(score.split("/")[1]) - parseInt(totalPts);

			// console.log(e);
			e.path[1].parentNode.removeChild(e.path[1]);
		});
	});
}, 10000);
