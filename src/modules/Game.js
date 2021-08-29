import { db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";

const Game = (() =>
{
	const handleMenuClick = async (x, y, level, character) =>
	{
		const characterInfo = await getDoc(doc(db, level, character)).then(data => data.data());
		if (x > characterInfo.x.min && x < characterInfo.x.max)
		{
			if (y > characterInfo.y.min && y < characterInfo.y.max)
			{
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
	
	return { handleMenuClick };
})();

export default Game;
