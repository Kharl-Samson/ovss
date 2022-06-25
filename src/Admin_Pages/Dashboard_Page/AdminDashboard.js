import React from "react";
import Admin_Navigation_Bar from "../Navigation_Bar/NavigationBar";
import "./dashboard.css"

import TabLogo from "../../Assets/Logo/Tab_Logo.png";

export default function AdminDashboard_Page(){

    //Loading the logo and the title on the Tab of the browser
    document.querySelector("link[rel='shortcut icon']").href = TabLogo;
    document.title = "OVSS | Dashboard";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_dashboard").style.pointerEvents="none";
    document.getElementById("left_nav_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_dashboard_link").style.backgroundColor = "#e7e7ff";
  }, 10);

return(
<div className="admin_dashboard_container">
    <Admin_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content"></div>

        <div className="right_navigation"></div>
    </div>

</div>
)
}