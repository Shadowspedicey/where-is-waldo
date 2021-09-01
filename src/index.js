import "regenerator-runtime/runtime";
import "./global.css";
import "./style.css";
import LevelSelection from "./modules/LevelSelection";

LevelSelection.create();

window.addEventListener("click", (e) =>	console.log(Math.round(e.pageX / e.target.offsetWidth * 1000), Math.round((e.pageY - 75) / e.target.height * 1000), e));
