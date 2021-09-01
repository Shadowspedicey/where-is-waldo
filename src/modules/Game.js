import { db } from "./firebase";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import uniqid from "uniqid";
import ClickMenu from "./ClickMenu";
import WinScreen from "./WinScreen";

const generateID = () =>
{
	const id = uniqid();
	localStorage.setItem("waldoID", id);
	return id;
};
//localStorage.removeItem("waldoID");
export const id = localStorage.getItem("waldoID") || generateID();

const Game = (() =>
{
	let stopwatch;

	console.log(id);

	// 0 representes not found while 1 represents found
	const foundCharacters = [0, 0, 0];

	const create = (level, cp, data) =>
	{
		const levelContainer = document.createElement("div");
		levelContainer.id = "level-container";
		setTimeout(() => document.body.style.overflow = "", 500);

		const stopwatchDiv = document.createElement("div");
		stopwatchDiv.id = "stopwatch";
		stopwatchDiv.innerHTML = "<span id='hrs'>00</span>:<span id='mins'>00</span>:<span id='secs'>00</span>";
		levelContainer.appendChild(stopwatchDiv);

		const levelImg = document.createElement("img");
		levelImg.src = level.img;
		levelContainer.appendChild(levelImg);

		const levelCp = document.createElement("div");
		levelCp.id = "level-cp";
		levelCp.innerHTML = "<span>Level image was created by </span>";
		levelContainer.appendChild(levelCp);

		document.querySelector("#content").appendChild(levelContainer);

		// Stopwatch starter
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

		// Copyrights
		const creator = document.createElement("a");
		creator.href = cp.link;
		creator.textContent = cp.name;
		document.querySelector("#level-cp span").appendChild(creator);

		start(level.name, data);
	};

	const start = (levelName, data) =>
	{
		// Randomize characters
		const shuffled = data.sort(() => 0.5 - Math.random());
		let newData = shuffled.slice(0, 3);
		// Initialize the click menu
		window.addEventListener("click", (e) => document.querySelector("#click-menu") ? ClickMenu.close() : ClickMenu.open(e, levelName, newData));

		// Sets time started on server to prevent cheating
		setDoc(doc(db, "attempts", id),
			{
				time: 
				{
					start: new Date().getTime(),
				},
			}, { merge: true });
	};

	const handleMenuClick = async (x, y, level, character, index) =>
	{
		const characterInfo = await getDoc(doc(db, level, character)).then(data => data.data());
		// Checks if mouse pos is in range of char info from server
		if (x > characterInfo.x.min && x < characterInfo.x.max)
		{
			if (y > characterInfo.y.min && y < characterInfo.y.max)
			{
				if (foundCharacters[index] === 1) return;
				else found(character);
				foundCharacters[index] = 1;
				if (checkIfWon())
				{
					foundAll();
					clearInterval(stopwatch);
					// Sets time finished on server to prevent cheating
					setDoc(doc(db, "attempts", id),
						{
							time: 
							{
								end: new Date().getTime(),
							},
						}, { merge: true });
					
					(async () =>
					{
						document.body.style.overflow = "hidden";
						const data = await getDoc(doc(db, "attempts", id)).then(data => data.data());
						const time = new Date(data.time.end - data.time.start).toISOString().substr(11, 8);
						WinScreen.create(time, level);
					})();
				}
			}
			else notFound();
		}
		else notFound();
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

	const foundAll = () =>
	{
		const foundDiv = document.createElement("div");
		foundDiv.classList.add("found-all");
		foundDiv.textContent = "You have found all the characters";
		document.querySelector("#level-container").appendChild(foundDiv);
	};

	const checkIfWon = () =>
	{
		for (let i = 0; i < 3; i++)
		{
			if (foundCharacters[i] === 0) return false;
		}
		return true;
	};

	window.onbeforeunload = () =>
	{
		deleteDoc(doc(db, "attempts", id));
		return undefined;
	};
	
	return { handleMenuClick, create };
})();

export default Game;
