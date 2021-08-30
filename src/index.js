import "regenerator-runtime/runtime";
import "./global.css";
import "./style.css";
import AD_2222 from "./levels/AD-2222.jpg";
import data from "./data/AD-2222.json";
import Game from "./modules/Game";

Game.create({name: "AD-2222", img: AD_2222}, {name: "Anamoly World", link: "https://anomaly-world.com"}, data);

window.addEventListener("click", (e) =>	console.log(Math.round(e.pageX / e.target.offsetWidth * 1000), Math.round((e.pageY - 75) / e.target.height * 1000), e));
