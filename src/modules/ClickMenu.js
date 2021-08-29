const ClickMenu = (() =>
{
	const open = (e, characters) =>
	{
		const clickMenu = document.createElement("div");
		clickMenu.id= "click-menu";
		clickMenu.style.left = `${e.pageX}px`;
		clickMenu.style.top = `${e.pageY}px`;

		for (let i = 0; i < 3; i++)
		{
			const character = document.createElement("div");
			character.classList.add("character");

			const imgDiv = document.createElement("div");
			imgDiv.classList.add("img-div");
			const img = document.createElement("img");
			img.src = characters[i].img;
			if (characters[i].name === "Tom") img.style.transform = "scale(1.5)";
			imgDiv.appendChild(img);
			character.appendChild(imgDiv);

			const name = document.createElement("div");
			name.textContent = characters[i].name;
			character.appendChild(name);

			clickMenu.appendChild(character);
		}

		document.querySelector("#content").appendChild(clickMenu);
	};

	const close = () => document.querySelector("#click-menu").remove();

	return { open, close };
})();

export default ClickMenu;