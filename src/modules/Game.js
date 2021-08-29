import { db } from "./firebase";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import uniqid from "uniqid";

const Game = (() =>
{
	let stopwatch;
	const id = uniqid();

	// 0 representes not found while 1 represents found
	const foundCharacters = [0, 0, 0];

	const handleMenuClick = async (x, y, level, character, index) =>
	{
		const characterInfo = await getDoc(doc(db, level, character)).then(data => data.data());
		if (x > characterInfo.x.min && x < characterInfo.x.max)
		{
			if (y > characterInfo.y.min && y < characterInfo.y.max)
			{
				foundCharacters[index] = 1;
				if (checkIfWon())
				{
					clearInterval(stopwatch);
					setDoc(doc(db, "attempts", id),
						{
							time: 
							{
								end: new Date().getTime(),
							},
						}, { merge: true });
					
					(async () =>
					{
						const data = await getDoc(doc(db, "attempts", id)).then(data => data.data());
						console.log(Math.round((data.time.end - data.time.start) / 1000));
					})();
				}
				return found(character);
			}
		}
		notFound();
	};

	const found = name =>
	{
		const foundDiv = document.createElement("div");
		foundDiv.classList.add("find-attempt", "found");
		foundDiv.textContent = `You have found ${name}!`;
		document.querySelector("#level-container").appendChild(foundDiv);
		setTimeout(() => foundDiv.remove(), 3000);
	};
	
	const notFound = () =>
	{
		const notFoundDiv = document.createElement("div");
		notFoundDiv.classList.add("find-attempt", "not-found");
		notFoundDiv.textContent = "Try again...";
		document.querySelector("#level-container").appendChild(notFoundDiv);
		setTimeout(() => notFoundDiv.remove(), 3000);
	};

	const checkIfWon = () =>
	{
		for (let i = 0; i < 3; i++)
		{
			if (foundCharacters[i] === 0) return false;
		}
		return true;
	};

	// Should run when img loads
	stopwatch = setInterval(() =>
	{
		const secs = document.querySelector("#stopwatch #secs");
		const mins = document.querySelector("#stopwatch #mins");
		const hrs = document.querySelector("#stopwatch #hrs");

		secs.textContent = `0${parseInt(secs.textContent) + 1}`.slice(-2);
		if (parseInt(secs.textContent) === 60)
		{
			secs.textContent = "00";
			mins.textContent = `0${parseInt(mins.textContent) + 1}`.slice(-2);
			if (parseInt(mins.textContent) === 60)
			{
				mins.textContent = "00";
				hrs.textContent = `0${parseInt(hrs.textContent) + 1}`.slice(-2);
			}
		}
	}, 1000);

	// Should also run when img loads
	setDoc(doc(db, "attempts", id),
		{
			time: 
			{
				start: new Date().getTime(),
			},
		}, { merge: true });
		
	window.onbeforeunload = () =>
	{
		deleteDoc(doc(db, "attempts", id));
		return undefined;
	};
	
	return { handleMenuClick };
})();

export default Game;
