import "regenerator-runtime/runtime";
import ClickMenu from "./modules/ClickMenu";
import "./global.css";
import "./style.css";
import AD_2222 from "./levels/AD-2222.jpg";
import data from "./data/AD-2222.json";

document.querySelector("img").src = AD_2222;

const shuffled = data.sort(() => 0.5 - Math.random());
let newData = shuffled.slice(0, 3);

window.addEventListener("click", (e) =>	console.log(Math.round(e.pageX / e.target.offsetWidth * 1000), Math.round(e.pageY / e.target.height * 1000), e));
window.addEventListener("click", (e) => document.querySelector("#click-menu") ? ClickMenu.close() : ClickMenu.open(e, "AD-2222", newData));

const creator = document.createElement("a");
creator.href = "https://anomaly-world.com/";
creator.textContent = "Anamoly World";
document.querySelector("#level-cp span").appendChild(creator);
