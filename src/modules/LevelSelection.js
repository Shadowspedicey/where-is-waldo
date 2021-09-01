import Game from "./Game";
import AD_2222 from "../data/AD-2222.json";
import The_Boys from "../data/The-Boys.json";

const LevelSelection = (() =>
{
	const slides = [AD_2222, The_Boys];
	let slidesN = 0;

	const create = () =>
	{
		const levelSelectionDiv = document.createElement("div");
		levelSelectionDiv.id = "level-selection";

		const leftArrow = document.createElement("span");
		leftArrow.classList.add("selection-arrow", "left");
		leftArrow.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z'/></svg>";
		levelSelectionDiv.appendChild(leftArrow);

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
				setTimeout(() => Game.create({name: slides[i].name, img: slides[i].img}, slides[i].cp, slides[i].characters)), 0);
		}
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
		
		const right = () =>
		{
			if (slidesN === slides.length - 1) return;
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
			if (slidesN === 0) return;
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
