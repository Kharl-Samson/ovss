import React from "react";
import TabLogo from "../Assets/Logo/Tab_Logo.png";
import Navigation_Bar from "./Navigation_Bar/NavigationBar";
import Url from "../Functions/Url";

export default function HomePage(){
  //Calling the url of announcement
  Url();

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Home Page";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("home_span_nav").style.color = "#4D77FF";
  }, 10);

  

return(
  <div>
    <Navigation_Bar/>
  </div>
)
}