import React from "react";
import TabLogo from "../Assets/Logo/Tab_Logo.png";
import Navigation_Bar from "./Navigation_Bar/NavigationBar";

export default function CovidcasesPage(){

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Covid Cases";

  setTimeout(function () {
    document.getElementById("covid_span_nav").style.color = "#4D77FF";
  }, 10);

return(
  <div>
    <Navigation_Bar/>
  </div>
)
}