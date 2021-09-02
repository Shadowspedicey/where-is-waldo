import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Game from "./Game";
const LevelSelection = (() =>
{
	const slides = [];
	let slidesN = 0;

	const create = async () =>
	{
		const levelSelectionDiv = document.createElement("div");
		levelSelectionDiv.id = "level-selection";

		const leftArrow = document.createElement("span");
		leftArrow.classList.add("selection-arrow", "left");
		leftArrow.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z'/></svg>";
		levelSelectionDiv.appendChild(leftArrow);

		console.log("Loading...");
		(await getDocs(collection(db, "levels"))).forEach(doc => slides.push(doc.data()));
		console.log("Done");

		const levelViewer = document.createElement("div");
		levelViewer.id = "level-viewer";
		const levelSlidesContainer = document.createElement("div");
		levelSlidesContainer.id = "level-slides-container";
		for (let i = 0; i < slides.length; i++)
		{
			const levelSlide = document.createElement("div");
			levelSlide.classList.add("level-slide");
			
			const levelSlideImgContainer = document.createElement("div");
			levelSlideImgContainer.classList.add("level-slide-img-container");
			const slideImg = document.createElement("img");
			slideImg.src = slides[i].img;
			levelSlideImgContainer.appendChild(slideImg);
			levelSlide.appendChild(levelSlideImgContainer);

			const possibleCharactersDiv = document.createElement("div");
			possibleCharactersDiv.classList.add("possible-characters");

			const possibleCharactersH1 = document.createElement("h1");
			possibleCharactersH1.textContent = "Possible Characters";
			possibleCharactersDiv.appendChild(possibleCharactersH1);

			const possibleCharactersUl = document.createElement("ul");
			for (let j = 0; j < slides[i].characters.length; j++)
			{
				const characterLi = document.createElement("li");
				const characterImg = document.createElement("img");
				characterLi.textContent = slides[i].characters[j].name;
				characterImg.src = slides[i].characters[j].img;
				characterImg.alt = slides[i].characters[j].name;
				characterLi.insertBefore(characterImg, characterLi.firstChild);
				possibleCharactersUl.appendChild(characterLi);
			}
			possibleCharactersDiv.appendChild(possibleCharactersUl);

			levelSlide.appendChild(possibleCharactersDiv);

			levelSlidesContainer.appendChild(levelSlide);
			levelSlide.addEventListener("click", () =>
			{
				levelSelectionDiv.style.opacity = 0;
				document.body.style.overflow = "hidden";
				setTimeout(() => Game.create({name: slides[i].name, img: slides[i].img}, slides[i].cp, slides[i].characters), 0);
				setTimeout(() => levelSelectionDiv.remove(), 1000);
			}, {once: true});
		}
		(async () =>
		{
			const leaderboardContainer = document.createElement("div");
			leaderboardContainer.classList.add("level-slide");
			leaderboardContainer.id = "leaderboard-container";

			const leaderboardH1 = document.createElement("h1");
			leaderboardH1.textContent = "Leaderboard";
			leaderboardContainer.appendChild(leaderboardH1);

			const leaderboard = document.createElement("div");
			leaderboard.id = "leaderboard";

			const players = [];
			(await getDocs(collection(db, "leaderboard"))).forEach(doc => players.push(...Object.values(doc.data())));
			players.sort((a, b) => a.time > b.time ? 1 : -1);
			for (let i = -1; i < players.length; i++)
			{
				const playerDiv = document.createElement("div");
				playerDiv.classList.add("player");
				i === -1 ? playerDiv.classList.add("header") : null;

				const ranking = document.createElement("span");
				ranking.id = "ranking";
				if (i === -1) ranking.textContent = "Ranking";
				else ranking.textContent = i + 1;
				playerDiv.appendChild(ranking);

				const playerName = document.createElement("span");
				playerName.id = "name";
				if (i === -1) playerName.textContent = "Name";
				else playerName.textContent = players[i].name;
				playerDiv.appendChild(playerName);

				const level = document.createElement("span");
				level.id = "level";
				if (i === -1) level.textContent = "Level";
				else level.textContent = players[i].level || "Ass";
				playerDiv.appendChild(level);

				const playerTime = document.createElement("span");
				playerTime.id = "time";
				if (i === -1) playerTime.textContent = "Time";
				else playerTime.textContent = players[i].time;
				playerDiv.appendChild(playerTime);

				leaderboard.appendChild(playerDiv);
			}
			leaderboardContainer.appendChild(leaderboard);

			levelSlidesContainer.appendChild(leaderboardContainer);
		})();
		levelViewer.appendChild(levelSlidesContainer);
		levelSelectionDiv.appendChild(levelViewer);

		const rightArrow = document.createElement("span");
		rightArrow.classList.add("selection-arrow", "right");
		rightArrow.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z'/></svg>";
		levelSelectionDiv.appendChild(rightArrow);
		rightArrow.addEventListener("click", () => slide.right());
		leftArrow.addEventListener("click", () => slide.left());

		document.querySelector("#content").appendChild(levelSelectionDiv);
	};

	const slide = (() =>
	{
		const rem = parseFloat(window.getComputedStyle(document.body.parentElement, null).getPropertyValue("font-size"));
		let canSlide = true;
		
		const right = () =>
		{
			if (!canSlide) return;
			if (slidesN === slides.length) return;
			canSlide = false;
			setTimeout(() => canSlide = true, 1000);
			const levelSlidesContainerDiv = document.querySelector("#level-slides-container");
			let prevLeft = parseInt(levelSlidesContainerDiv.style.left) || 0;
			levelSlidesContainerDiv.style.animation = "sliderToRight 1s ease-in-out 0s 1 forwards";
			setTimeout(() =>
			{
				levelSlidesContainerDiv.style.left = (prevLeft + (-5 * rem) + -750) + "px";
				levelSlidesContainerDiv.style.animation = "";
			}, 1000);
			slidesN++;
		};

		const left = () =>
		{
			if (!canSlide) return;
			if (slidesN === 0) return;
			canSlide = false;
			setTimeout(() => canSlide = true, 1000);
			const levelSlidesContainerDiv = document.querySelector("#level-slides-container");
			let prevLeft = parseInt(levelSlidesContainerDiv.style.left) || 0;
			levelSlidesContainerDiv.style.animation = "sliderToLeft 1s ease-in-out 0s 1 forwards";
			setTimeout(() =>
			{
				levelSlidesContainerDiv.style.left = (prevLeft + ((5 * rem) + 750)) + "px";
				levelSlidesContainerDiv.style.animation = "";
			}, 1000);
			slidesN--;
		};

		return { right, left };
	})();

	return { create };
})();

export default LevelSelection;
