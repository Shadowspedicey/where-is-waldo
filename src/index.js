import ClickMenu from "./modules/ClickMenu";
import "./global.css";
import "./style.css";
import AD_2222 from "./levels/AD-2222.jpg";
import data from "./data/AD-2222.json";

document.querySelector("img").src = AD_2222;
window.addEventListener("click", (e) =>	console.log(e.x / e.target.offsetWidth * 1000, e));
window.addEventListener("click", (e) =>
{
	if (document.querySelector("#click-menu")) return ClickMenu.close();
	ClickMenu.open(e, data);
});

const creator = document.createElement("a");
creator.href = "https://anomaly-world.com/";
creator.textContent = "Anamoly World";
document.querySelector("#level-cp span").appendChild(creator);

// Don't starve guy
// Spider-Man
// Tom from tom and jerry
// Dragonborn
// Sonic
// Connor from cyberlife
