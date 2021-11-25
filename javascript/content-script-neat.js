function css(element, style) {
	for (const property in style) element.style[property] = style[property];
}

const calcTotalGrade = (localStorageObject) => {
	let totalGrade = 0;
	let totalWeight = 0;
	localStorageObject.forEach(({ weight, percent }, idx) => {
		totalGrade += parseInt(weight) * parseFloat(parseFloat(percent.slice(1, -2)));
		totalWeight += parseInt(weight);
	});
	totalGrade = totalGrade / totalWeight;
	return totalGrade;
};

const calcGradeBasedOnLocalObject = (title, category, firstTotalValue, secondTotalValue) => {
	let newLocalStorage = [];
	let newCatTemp = category.textContent.split(" ");
	newCatTemp.shift();
	newCatTemp = newCatTemp.join(" ");

	JSON.parse(localStorage.getItem("course_info"))[`${title}`].forEach((obj, idx) => {
		let scoreObj; // the score from the object
		let weight; // the weight of the category
		newLocalStorage.push({});
		// IF THE CATEGORY IS THE OBJECT NAME --> THE ASSIGNMENT IS ADDED TO THAT CATEGORY
		if (obj.name === newCatTemp) {
			// SPLIT THE SCORE PROPERTY FROM THE MAIN OBJECT
			scoreObj = obj.score;
			scoreObj = scoreObj.split("/");

			// GET THE WEIGHT PROPERTY FROM THE MAIN OBJECT
			weight = parseInt(obj.weight);

			// totalWeight += weight;

			// GET TOTAL POSSIBLE POINTS AND TOTAL POINTS EARNED TO DIVIDE THEM
			let totalPtsPossible = parseInt(scoreObj[1]) + parseInt(secondTotalValue);
			let totalPtsEarned = parseInt(scoreObj[0]) + parseInt(firstTotalValue);

			newLocalStorage[idx].score = `${totalPtsEarned}/${totalPtsPossible}`;

			// CALCULATE THE PERCENT OF THE WEIGHTAGE
			let weightGrade = weight * (totalPtsEarned / totalPtsPossible / 100);
			newLocalStorage[idx].percent = `(${((totalPtsEarned / totalPtsPossible) * 100).toFixed(
				2
			)}%)`;

			newLocalStorage[idx].name = obj.name;
			newLocalStorage[idx].weight = obj.weight;

			// ADD THE WEIGHT GRADE TO THE TOTAL GRADE
			// totalGrade += weightGrade;
		} else {
			// IF THE CATEGORY THAT IS ADDED IS NOT THE OBJECT
			// GET PERCENT OF THE OBJECT
			// let objPercent = obj.percent.slice(1);
			// objPercent = objPercent.slice(0, -2);
			// objPercent = parseFloat(objPercent);

			// WEIGHT OF THE OBJECT
			// let w = parseInt(obj.weight);
			// ADD IT TO THE TOTAL WEIGHT BECAUSE NOTHING CHANGES
			// let weightGrade = w * (objPercent / 100);

			// ADD THE WEIGHT GRADE (STAYS THE SAME) TO THE TOTAL GRADE
			// totalGrade += weightGrade;

			newLocalStorage[idx].name = obj.name;
			newLocalStorage[idx].weight = obj.weight;
			newLocalStorage[idx].score = obj.score;
			newLocalStorage[idx].percent = obj.percent;
		}
	});

	return newLocalStorage;
};

const calcGradeBasedOnLocalDeleteObject = (title, e) => {
	const deleteNewLocalStorage = [];
	JSON.parse(localStorage.getItem("course_info"))[`${title}`].forEach((obj, idx) => {
		deleteNewLocalStorage.push({});
		let curCatTemp = e.path[2].querySelectorAll("div > p")[1].textContent.split(" ");
		curCatTemp.shift();
		curCatTemp = curCatTemp.join(" ");
		let curScoreTemp = e.path[2].querySelectorAll("div > p")[0].textContent.split(" ");
		curScoreTemp.shift();
		curScoreTemp = curScoreTemp.join(" ");
		let curNameTemp = e.path[2].querySelectorAll("div > h4")[0].textContent.split(" ");
		curNameTemp.shift();
		curNameTemp = curNameTemp.join(" ");
		if (obj.name === curCatTemp) {
			let curScore = curScoreTemp;
			let curScorePts = parseInt(curScore.split("/")[0]);
			let curScoreTotalPts = parseInt(curScore.split("/")[1]);

			let prevScore = obj.score;
			let prevScorePts = parseInt(prevScore.split("/")[0]);
			let prevScoreTotalPts = parseInt(prevScore.split("/")[1]);

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

	return deleteNewLocalStorage;
};

const main = (iframeContainer) => {
	localStorage.clear();
	// CSS FUNCTION TO QUICKLY ADD CSS FOR AN ELEMENT
	// GET THE IFRAME
	const arrayOfCategories = []; // the array of categories
	const localStorageObj = {}; // local storage object for storing the info in local storage

	// const mainDiv = document.createElement("div");
	// const enableButton = document.createElement("input");
	// enableButton.type = "checkbox";
	// enableButton.checked = true;
	// enableButton.value = "Disable Ez-Campus";

	// mainDiv.appendChild(enableButton);

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
			let temp = nameAndWeight.split(":")[0].trim();
			temp = temp.split(" ");
			temp.pop();
			temp = temp.join(" ");
			arrayOfCategories[idx].name = temp;
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

	// ERROR COMPONENT
	const errorDiv = document.createElement("div");
	const errorMsg = document.createElement("h3");
	errorDiv.appendChild(errorMsg);

	css(errorMsg, { color: "#99e0b2" });
	css(errorDiv, {
		display: "none",
	});

	// CATEGORY FORM COMPONENT
	const categoryDivForm = document.createElement("div");
	const errorCategoryDivFormMsg = document.createElement("div");
	const errorCategoryMsg = document.createElement("h3");
	errorCategoryMsg.textContent = "";
	errorCategoryDivFormMsg.appendChild(errorCategoryMsg);
	categoryDivForm.appendChild(errorCategoryDivFormMsg);
	css(errorCategoryDivFormMsg, { display: "none" });
	css(errorCategoryMsg, { color: "#99e0b2" });
	for (let i = 0; i < arrayOfCategories.length; i++) {
		const categoryTempForm = document.createElement("form");
		const labelCategory = document.createElement("p");
		labelCategory.textContent = `Change "${arrayOfCategories[i].name}" Score and Weight:`;
		const categoryScoreInp1 = document.createElement("input");
		categoryScoreInp1.placeholder = "Enter new score here";
		categoryScoreInp1.id = `${arrayOfCategories[i].name.split(" ").join("-")}-score1-change`;
		categoryScoreInp1.type = "number";
		categoryScoreInp1.min = 0;
		const categoryScoreInp2 = document.createElement("input");
		categoryScoreInp2.placeholder = "Enter new score here";
		categoryScoreInp2.id = `${arrayOfCategories[i].name.split(" ").join("-")}-score2-change`;
		categoryScoreInp2.type = "number";
		categoryScoreInp2.min = 1;
		const categoryWeightInp = document.createElement("input");
		categoryWeightInp.placeholder = "Enter new weight here";
		categoryWeightInp.id = `${arrayOfCategories[i].name.split(" ").join("-")}-weight-change`;
		categoryWeightInp.type = "number";
		categoryWeightInp.min = 1;
		const categoryUpdateSubmit = document.createElement("input");
		categoryUpdateSubmit.type = "submit";
		categoryUpdateSubmit.value = "Apply";

		categoryTempForm.appendChild(labelCategory);
		categoryTempForm.appendChild(categoryWeightInp);
		categoryTempForm.appendChild(categoryScoreInp1);
		categoryTempForm.appendChild(categoryScoreInp2);
		categoryTempForm.appendChild(categoryUpdateSubmit);
		categoryDivForm.appendChild(categoryTempForm);
		css(categoryDivForm, { "margin-left": "32px" });
		css(categoryTempForm, { display: "flex", "margin-top": "0.5rem" });
		css(labelCategory, { margin: "0 0.5rem 0 0" });
		css(categoryWeightInp, { "margin-right": "0.5rem", padding: "0.5rem" });
		css(categoryScoreInp1, { "margin-right": "0.5rem", padding: "0.5rem" });
		css(categoryScoreInp2, { "margin-right": "0.5rem", padding: "0.5rem" });
		css(categoryUpdateSubmit, {
			padding: "5px 15px",
			height: "auto",
			"background-color": "#99e0b2",
			border: "0 none",
			cursor: "pointer",
			"border-radius": "5px",
			height: "2rem",
		});

		categoryTempForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const newLocalChangeObject = [];
			const newWeight = parseInt(e.path[0][0].value);
			const newScore1 = parseInt(e.path[0][1].value);
			const newScore2 = parseInt(e.path[0][2].value);
			if (!newWeight) {
				errorCategoryMsg.textContent = "Please enter a weight";
				css(errorCategoryDivFormMsg, {
					width: "100%",
					height: "3rem",
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
				});
				return;
			}
			if (!newScore1) {
				errorCategoryMsg.textContent = "Please enter a score";
				css(errorCategoryDivFormMsg, {
					width: "100%",
					height: "3rem",
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
				});
				return;
			}
			if (!newScore2) {
				errorCategoryMsg.textContent = "Please enter a total score";
				css(errorCategoryDivFormMsg, {
					width: "100%",
					height: "3rem",
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
				});
				return;
			}

			css(errorCategoryDivFormMsg, { display: "none" });
			errorCategoryMsg.textContent = "";

			JSON.parse(localStorage.getItem("course_info"))[`${title}`].forEach((obj, idx) => {
				newLocalChangeObject.push({});

				if (obj.name === e.path[0][0].id.split("-").slice(0, -2).join(" ")) {
					newLocalChangeObject[idx].weight = `${newWeight}`;
					newLocalChangeObject[idx].score = `${newScore1}/${newScore2}`;
					newLocalChangeObject[idx].percent = `(${((newScore1 / newScore2) * 100).toFixed(
						2
					)}%)`;
					newLocalChangeObject[idx].name = obj.name;
					console.log(newLocalChangeObject);
				} else {
					newLocalChangeObject[idx].weight = obj.weight;
					newLocalChangeObject[idx].score = obj.score;
					newLocalChangeObject[idx].percent = obj.percent;
					newLocalChangeObject[idx].name = obj.name;
				}
			});

			let newLocalChangeObjectGrade = calcTotalGrade(newLocalChangeObject);
			newGradeGrade.textContent = `Calculated Grade: ${newLocalChangeObjectGrade.toFixed(
				2
			)}%`;
			let t = {};
			t[`${title}`] = newLocalChangeObject;
			newGrade.querySelectorAll("h3").forEach((tag, idx) => {
				tag.textContent = `${t[title][idx].name} (Weight: ${t[title][idx].weight}): ${t[title][idx].score}`;
			});
			localStorage.setItem("course_info", JSON.stringify(t));
		});
	}

	// FORM COMPONENT
	const form = document.createElement("form");

	// SELECT COMPONENT
	const selectCategories = document.createElement("select");
	const defaultOption = document.createElement("option");
	defaultOption.value = "default";
	defaultOption.textContent = "Please Choose A Category";
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

	// GET THE TOTAL PTS EARNED
	const firstScoreInput = document.createElement("input");
	firstScoreInput.type = "number";
	firstScoreInput.id = "first-score-unique-id";
	firstScoreInput.placeholder = "Your Score";
	firstScoreInput.min = 0;

	// GET THE TOTAL POSSIBLE PTS
	const secondScoreInput = document.createElement("input");
	secondScoreInput.type = "number";
	secondScoreInput.id = "second-score-unique-id";
	secondScoreInput.placeholder = "Total Points";
	secondScoreInput.min = 1;

	// NAME COMPONENT
	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.placeholder = "Name of Assignment";
	nameInput.id = "name-unique-id";

	// SUBMIT COMPONENT
	const submit = document.createElement("input");
	submit.type = "submit";
	submit.value = "Submit";

	// APPEND VALS
	form.appendChild(selectCategories);
	form.appendChild(nameInput);
	form.appendChild(firstScoreInput);
	form.appendChild(secondScoreInput);
	form.appendChild(submit);
	// mainDiv.appendChild(form);

	// STYLE THE FORM AND ITS COMPONENTS
	css(form, {
		width: "100%",
		height: "4rem",
		display: "flex",
		"justify-content": "center",
		"align-items": "center",
	});
	css(selectCategories, { "margin-right": "0.5rem", height: "2rem" });
	css(nameInput, { "margin-right": "0.5rem", padding: "0.3rem 0.5rem", height: "2rem" });
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
	css(newGradeGrade, { "margin-right": "1rem" });
	newGrade.appendChild(newGradeGrade);
	let grade = iframeContainer.contentWindow.document.querySelector(
		".grading-score__row-spacing"
	).textContent;
	for (let i = 0; i < arrayOfCategories.length; i++) {
		const categoryGrade = document.createElement("h3");
		categoryGrade.textContent = `${arrayOfCategories[i].name} (Weight: ${arrayOfCategories[i].weight}): ${arrayOfCategories[i].score}`;
		categoryGrade.id = `${arrayOfCategories[i].name.split(" ").join("-")}-category-score`;
		css(categoryGrade, { "margin-right": "1rem" });
		newGrade.appendChild(categoryGrade);
	}
	css(newGrade, { display: "flex" });
	// GET THE DEFAULT GRADE FROM INF CAMP
	grade = grade.substring(1, grade.length - 1);
	newGradeGrade.textContent = `Calculated Grade: ${grade.slice(1, -1)}`;
	addedAssignments.prepend(newGrade);

	// ADD ASSIGNMENTS + FORM TO THE IFRAME
	iframeContainer.contentWindow.document
		.querySelector(".workspace-content")
		.prepend(addedAssignments);
	iframeContainer.contentWindow.document.querySelector(".workspace-content").prepend(form);
	iframeContainer.contentWindow.document.querySelector(".workspace-content").prepend(errorDiv);
	const formTitle = document.createElement("h2");
	formTitle.textContent = "Add New Assignments";
	css(formTitle, { "margin-left": "32px", "margin-top": "1.4rem" });
	iframeContainer.contentWindow.document.querySelector(".workspace-content").prepend(formTitle);
	const categoryTitle = document.createElement("h2");
	categoryTitle.textContent = "Edit Weightages and Total Score";
	css(categoryTitle, { "margin-left": "32px", "margin-top": "1.4rem" });
	iframeContainer.contentWindow.document
		.querySelector(".workspace-content")
		.prepend(categoryDivForm);
	iframeContainer.contentWindow.document
		.querySelector(".workspace-content")
		.prepend(categoryTitle);

	// WHEN FORM IS SUBMITTED
	form.addEventListener("submit", (event) => {
		// PREVENT RELOAD
		event.preventDefault();

		// CREATE NEW ASSIGNMENT
		const newAssignment = document.createElement("div");
		// GET ASSIGNMENT NAME VALUE FROM FORM
		const name = document.createElement("h4");
		name.innerHTML =
			"<strong>Name</strong>: " +
			iframeContainer.contentWindow.document.querySelector("#name-unique-id").value;
		// GET ASSIGNMENT SCORE VALUE FROM FORM
		const score = document.createElement("p");
		const firstTotalValue =
			iframeContainer.contentWindow.document.querySelector("#first-score-unique-id").value;
		const secondTotalValue =
			iframeContainer.contentWindow.document.querySelector("#second-score-unique-id").value;
		score.innerHTML = `<strong>Score</strong>: ${firstTotalValue}/${secondTotalValue}`;
		// GET CATEGORY FROM FORM
		const category = document.createElement("p");
		category.innerHTML =
			"<strong>Category</strong>: " +
			iframeContainer.contentWindow.document.querySelector("#category-unique-id").value;

		// CHECK TO SEE IF USER CHOSE CATEGORY
		if (
			iframeContainer.contentWindow.document.querySelector("#category-unique-id").value ===
			"default"
		) {
			css(errorDiv, {
				width: "100%",
				height: "3rem",
				display: "flex",
				"justify-content": "center",
				"align-items": "center",
			});
			errorMsg.textContent = "Please select a category";
			return;
		}

		if (iframeContainer.contentWindow.document.querySelector("#name-unique-id").value === "") {
			css(errorDiv, {
				width: "100%",
				height: "3rem",
				display: "flex",
				"justify-content": "center",
				"align-items": "center",
			});
			errorMsg.textContent = "Please enter a name";
			return;
		}

		if (
			iframeContainer.contentWindow.document.querySelector("#first-score-unique-id").value ===
			""
		) {
			css(errorDiv, {
				width: "100%",
				height: "3rem",
				display: "flex",
				"justify-content": "center",
				"align-items": "center",
			});
			errorMsg.textContent = "Please enter a score";
			return;
		}

		if (
			iframeContainer.contentWindow.document.querySelector("#second-score-unique-id")
				.value === ""
		) {
			css(errorDiv, {
				width: "100%",
				height: "3rem",
				display: "flex",
				"justify-content": "center",
				"align-items": "center",
			});
			errorMsg.textContent = "Please enter a total score";
			return;
		}

		// IF THEY DIDNT CHOOSE CATEGORY, REMOVE THE ERROR DIV
		css(errorDiv, { display: "none" });
		errorMsg.textContent = "";

		// STYLE THE NAME AND SCORE OF THE ASSIGNMENT
		css(name, { "margin-right": "3rem" });
		css(score, { "margin-right": "3rem" });

		// WHEN FORM SUBMITS EDIT GRADE
		const formSubmitLocalObj = calcGradeBasedOnLocalObject(
			title,
			category,
			firstTotalValue,
			secondTotalValue
		);
		let formSubmitTotalGrade = calcTotalGrade(formSubmitLocalObj);
		newGradeGrade.textContent = `Calculated Grade: ${formSubmitTotalGrade.toFixed(2)}%`;
		let t = {};
		t[`${title}`] = formSubmitLocalObj;
		newGrade.querySelectorAll("h3").forEach((tag, idx) => {
			tag.textContent = `${t[title][idx].name} (Weight: ${t[title][idx].weight}): ${t[title][idx].score}`;
		});
		localStorage.setItem("course_info", JSON.stringify(t));

		// console.log(score.textContent);

		// ADD THE NEW ASSIGNMENT TO THE DOM
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "delete";

		const nameDiv = document.createElement("div");
		css(nameDiv, {
			display: "flex",
			"justify-content": "center",
			"align-items": "center",
			"margin-right": "2rem",
		});
		nameDiv.appendChild(name);

		const scoreDiv = document.createElement("div");
		css(scoreDiv, {
			display: "flex",
			"justify-content": "center",
			"align-items": "center",
			"margin-right": "2rem",
		});
		scoreDiv.appendChild(score);

		const categoryDiv = document.createElement("div");
		css(categoryDiv, {
			display: "flex",
			"justify-content": "center",
			"align-items": "center",
			"margin-right": "2rem",
		});
		categoryDiv.appendChild(category);

		const deleteBtnDiv = document.createElement("div");
		css(deleteBtnDiv, {
			display: "flex",
			"justify-content": "center",
			"align-items": "center",
		});
		deleteBtnDiv.appendChild(deleteButton);

		// const categoryAvgDiv = document.createElement("div");
		// css(categoryAvgDiv, {
		// 	display: "flex",
		// 	"justify-content": "center",
		// 	"align-items": "center",
		// });
		// JSON.parse(localStorage.getItem("course_info"))[`${title}`].forEach((obj, idx) => {
		// 	const tempCatAvgTag = document.createElement("p");

		// 	tempCatAvgTag.innerHTML = `<strong>Category (${obj.name})</strong>: ${obj.percent.slice(
		// 		1,
		// 		-2
		// 	)}`;

		// 	categoryAvgDiv.appendChild(tempCatAvgTag);
		// });

		newAssignment.appendChild(nameDiv);
		newAssignment.appendChild(scoreDiv);
		newAssignment.appendChild(categoryDiv);
		// newAssignment.appendChild(categoryAvgDiv);
		newAssignment.appendChild(deleteBtnDiv);

		newAssignment.id = `${name.textContent.split().join("-")}`;
		css(newAssignment, { display: "flex", "margin-bottom": "0.7rem" });
		css(name, { margin: "0" });
		css(score, { margin: "0" });
		css(category, { margin: "0" });
		css(deleteButton, {
			margin: "0",
			padding: "3px 7px",
			height: "auto",
			"background-color": "#99e0b2",
			border: "0 none",
			cursor: "pointer",
			"border-radius": "5px",
			height: "2rem",
		});

		// CHANGE THE CONTENT FROM NO ASSIGNMENTS TO ADDED ASSIGNMENTS
		assignmentHeader.textContent = "Added Assignments:";
		addedAssignments.appendChild(newAssignment);

		deleteButton.addEventListener("click", (e) => {
			// let deleteNewTotalGrade = 0;
			// let deleteNewTotalWeightage = 0;
			// deleteNewLocalStorage.forEach(({ weight, percent }, idx) => {
			// 	deleteNewTotalGrade +=
			// 		parseInt(weight) * parseFloat(parseFloat(percent.slice(1, -2)));
			// 	deleteNewTotalWeightage += parseInt(weight);
			// });
			// deleteNewTotalGrade = deleteNewTotalGrade / deleteNewTotalWeightage;
			const deleteNewLocalStorage = calcGradeBasedOnLocalDeleteObject(title, e);
			const deleteTotalGrade = calcTotalGrade(deleteNewLocalStorage);
			newGradeGrade.textContent = `Calculated Grade: ${deleteTotalGrade.toFixed(2)}%`;
			let dt = {};
			dt[`${title}`] = deleteNewLocalStorage;
			newGrade.querySelectorAll("h3").forEach((tag, idx) => {
				tag.textContent = `${dt[title][idx].name} (Weight: ${dt[title][idx].weight}): ${dt[title][idx].score}`;
			});
			localStorage.setItem("course_info", JSON.stringify(dt));

			e.path[2].parentNode.removeChild(e.path[2]);
			if (addedAssignments.querySelectorAll("div").length === 1)
				assignmentHeader.textContent = "No assignments added.";
		});
	});
};

setTimeout(async () => {
	const iframeContainer = document.getElementById("main-workspace");
	function waitForElm(item) {
		return new Promise((resolve) => {
			if (item) {
				return resolve(item);
			}

			const observer = new MutationObserver((mutations) => {
				if (item) {
					resolve(item);
					observer.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		});
	}

	const elm = await waitForElm(iframeContainer);

	const title = elm.contentWindow.document.querySelector(".card__header.sticky.z-10");
	if (!title) {
		const titleInterval = setInterval(() => {
			if (elm.contentWindow.document.querySelector(".card__header.sticky.z-10")) {
				if (
					!elm.contentWindow.document
						.querySelectorAll("button.divider__header > div")[0]
						.querySelector("div")
				) {
					const workspaceDiv =
						elm.contentWindow.document.querySelector(".workspace-content");
					const div = document.createElement("div");
					const header = document.createElement("h2");
					header.textContent =
						"Your Teacher has not chosen to add weights on your class, please read more here";
					div.appendChild(header);
					css(div, {
						width: "100%",
						height: "4rem",
						display: "flex",
						"justify-content": "center",
						"align-items": "center",
					});
					workspaceDiv.prepend(div);
					clearInterval(titleInterval);
					return;
				}
				clearInterval(titleInterval);
				main(elm);
			}
		}, 1000);
	}

	// setTimeout(main, 10000);
	// main(elm);
}, 1000);
