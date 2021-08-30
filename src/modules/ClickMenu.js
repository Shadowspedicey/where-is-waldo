import Game from "./Game";

const ClickMenu = (() =>
{
	const open = (e, level, characters) =>
	{
		const clickMenu = document.createElement("div");
		clickMenu.id= "click-menu";
		
		for (let i = 0; i < 3; i++)
		{
			const character = document.createElement("div");
			character.classList.add("character");
			
			const imgDiv = document.createElement("div");
			imgDiv.classList.add("img-div");
			const img = document.createElement("img");
			img.src = characters[i].img;
			imgDiv.appendChild(img);
			character.appendChild(imgDiv);
			
			const name = document.createElement("div");
			name.textContent = characters[i].name;
			character.appendChild(name);
			
			clickMenu.appendChild(character);
			const x = Math.round(e.pageX / e.target.offsetWidth * 1000);
			const y = Math.round((e.pageY - 75) / e.target.offsetHeight * 1000);
			character.addEventListener("click", () => Game.handleMenuClick(x, y, level, characters[i].name, i));
		}
		
		document.querySelector("#content").appendChild(clickMenu);
		
		const menu = document.querySelector("#click-menu");
		
		if (e.pageX + menu.offsetWidth > document.body.offsetWidth)
			clickMenu.style.left = `${e.pageX - menu.offsetWidth}px`;
		else clickMenu.style.left = `${e.pageX}px`;

		if (e.pageY + menu.offsetHeight > document.body.offsetHeight)
			clickMenu.style.top = `${e.pageY - menu.offsetHeight}px`;
		else clickMenu.style.top = `${e.pageY}px`;
	};
	
	const close = () => document.querySelector("#click-menu").remove();

	return { open, close };
})();

export default ClickMenu;
