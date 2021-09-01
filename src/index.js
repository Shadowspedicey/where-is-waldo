import "regenerator-runtime/runtime";
import "./global.css";
import "./style.css";
import "../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css";
import LevelSelection from "./modules/LevelSelection";
import WinScreen from "./modules/WinScreen";

WinScreen.create("00:00:05");
LevelSelection.create();

window.addEventListener("click", (e) =>	console.log(Math.round(e.pageX / e.target.offsetWidth * 1000), Math.round((e.pageY - 75) / e.target.height * 1000), e));
