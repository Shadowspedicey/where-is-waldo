const WinScreen = (() =>
{
	const create = playerTime =>
	{
		const winScreenContainer = document.createElement("div");
		winScreenContainer.id = "win-screen-container";
		setTimeout(() => winScreenContainer.style.opacity = 1, 100);

		const winScreen = document.createElement("div");
		winScreen.id = "win-screen";
		winScreen.classList.add("round");
		setTimeout(() => winScreen.style.transform = "initial", 500);
		
		const upper = document.createElement("div");
		upper.classList.add("upper");
		const youWin = document.createElement("h1");
		youWin.textContent = "YOU WIN!";
		upper.appendChild(youWin);
		const timeDiv = document.createElement("div");
		timeDiv.id = "time-div";
		const yourTime = document.createElement("h2");
		yourTime.textContent = "YOUR TIME:";
		timeDiv.appendChild(yourTime);
		const time = document.createElement("span");
		time.classList.add("time");
		time.textContent = `${playerTime}`;
		timeDiv.appendChild(time);
		upper.appendChild(timeDiv);
		winScreen.appendChild(upper);

		const lower = document.createElement("div");
		lower.classList.add("lower");
		const inputBox = document.createElement("div");
		inputBox.classList.add("input-box");
		const nameLabel = document.createElement("label");
		nameLabel.htmlFor = "name";
		nameLabel.textContent = "Your Name:";
		inputBox.appendChild(nameLabel);
		const nameInput = document.createElement("input");
		nameInput.type = "text";
		nameInput.id = "name";
		inputBox.appendChild(nameInput);
		lower.appendChild(inputBox);

		const sumbit = document.createElement("button");
		sumbit.id = "submit";
		sumbit.textContent = "Submit";
		lower.appendChild(sumbit);

		winScreen.appendChild(lower);

		winScreenContainer.appendChild(winScreen);
		
		document.querySelector("#content").insertBefore(winScreenContainer, document.querySelector("#content").firstChild);
	};

	return { create };
})();

export default WinScreen;
