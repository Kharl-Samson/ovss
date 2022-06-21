import React from "react";
import TabLogo from "../Assets/Logo/Logo.png";

export default function HomePage(){

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Home Page";

    return(
        <h1>Home Page</h1>
    )
}