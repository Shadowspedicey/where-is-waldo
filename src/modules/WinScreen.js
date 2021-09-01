import { updateDoc, doc } from "@firebase/firestore";
import { getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { id } from "./Game";

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

		const anonymousDiv = document.createElement("div");
		anonymousDiv.id = "anonymous-container";
		const prettyDiv = document.createElement("div");
		prettyDiv.classList.add("pretty", "p-switch", "p-fill");
		const anonCheckbox = document.createElement("input");
		anonCheckbox.type = "checkbox";
		anonCheckbox.id = "anon";
		anonCheckbox.addEventListener("change", () => nameInput.disabled = !nameInput.disabled);
		prettyDiv.appendChild(anonCheckbox);
		const stateDiv = document.createElement("div");
		stateDiv.classList.add("state", "p-danger");
		const anonLabel = document.createElement("label");
		anonLabel.textContent = "Anonymous";
		stateDiv.appendChild(anonLabel);
		prettyDiv.appendChild(stateDiv);
		anonymousDiv.appendChild(prettyDiv);
		lower.appendChild(anonymousDiv);

		const sumbit = document.createElement("button");
		sumbit.id = "submit";
		sumbit.textContent = "Submit";
		sumbit.addEventListener("click", () => submitScore(playerTime));
		lower.appendChild(sumbit);

		winScreen.appendChild(lower);

		winScreenContainer.appendChild(winScreen);
		
		document.querySelector("#content").insertBefore(winScreenContainer, document.querySelector("#content").firstChild);
	};

	const submitScore = time =>
	{
		if (!checkName()) return;
		const name = checkName();
		addToLeaderboard(name, time);
		close();
	};

	const checkName = () =>
	{
		if (document.querySelector("input#anon").checked) return "Anonymous";
		const name = document.querySelector("input#name");
		name.value = name.value.trim();
		if (name.value === "")
			return alert("Please enter a name or choose Anonymous");
		else if (name.value.length > 10)
			return alert("Max characters: 10");
		return name.value;
	};

	const addToLeaderboard = async (name, time) =>
	{
		// tries to get pb and compares it with current time
		let data = await getDoc(doc(db, "leaderboard", id)).then(data => data.data());
		if (data)
		{
			const pb = Object.values(data).filter(player => player.name === name)[0].time;
			console.log(pb);
			if (time > pb) return;
		}
		try
		{
			await updateDoc(doc(db, "leaderboard", id), 
				{
					[name]:
					{
						name,
						time,
					}
				});
		} catch (error)
		{
			if (error.toString().includes("No document to update"))
			{
				setDoc(doc(db, "leaderboard", id),
					{
						[name]:
						{
							name,
							time,
						}
					});
			}
		}
	};

	const close = () =>
	{
		setTimeout(() => document.querySelector("#win-screen-container").style.opacity = "0", 500);
		document.querySelector("#win-screen").style.transform = "translate(100vw)";
		document.body.style.overflow = "";
	};

	return { create };
})();

export default WinScreen;
