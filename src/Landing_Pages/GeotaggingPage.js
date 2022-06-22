import React from "react";
import TabLogo from "../Assets/Logo/Tab_Logo.png";
import Navigation_Bar from "./Navigation_Bar/NavigationBar";

export default function GeotaggingPage(){

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Geotagging";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("geotagging_span_nav").style.color = "#4D77FF";
  }, 10);

return(
  <div>
    <Navigation_Bar/>
  </div>
)
}