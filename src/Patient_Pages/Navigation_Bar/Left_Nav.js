import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "./Left_NavigationBar.css";
import "../../Modals/modal.css";

import Dashboard_Icon from "../../Assets/Icons/Dashboard_Icon.png";
import Sign_Out_Icon from "../../Assets/Icons/Sign_Out_Icon.png";
import Website_Logo from "../../Assets/Logo/Logo.png";
import Mini_Logo from "../../Assets/Logo/Mini_Logo.png";
import Profile_Icon from "../../Assets/Icons/Profile_Icon.png";
import geotagging_icon from "../../Assets/Icons/geotagging_icon.png";
import Schedule_Icon from "../../Assets/Icons/Schedule_Icon.png";

export default function Patient_Left_Navigation_Bar(){

//If local storage email has no value it can't acces admin pages
const [auth, setAuth] = useState("");
let navigate = useNavigate();

useEffect(() => {
  var auth = localStorage.getItem("patient_login_email");
  if (auth === null) {
    navigate(`/`);
  }
  setAuth(auth);
}, []);

//Tooltip
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}/>
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: ".8rem",
    },
  }));   

//When hovering the navbar
function hover_navbar(){
  document.getElementsByClassName("admin_navigation_bar_container")[0].style.width = "265px";
  document.getElementById("mini_logo").style.display = "none";
  document.getElementById("whole_logo").style.display = "block";
}
function remove_hover_navbar(){
  document.getElementsByClassName("admin_navigation_bar_container")[0].style.width = "75px";
  document.getElementById("mini_logo").style.display = "block";
  document.getElementById("whole_logo").style.display = "none";
}



return(
   <div className="admin_navigation_bar_container" onMouseOver={hover_navbar} onMouseOut={remove_hover_navbar}>

    <div className="first">
      <div className="top">
          <img src={Mini_Logo} alt="" id="mini_logo"/>
          <img src={Website_Logo} alt="" style={{display:"none"}} id="whole_logo"/>
      </div>


      <div id="link_dashboard" style={{marginBottom: "10px"}}>
        <Link to="/Patient_Dashboard" style={{textDecoration:"none"}}>
        <div className="link_container" id="admin_dashboard_link">
            <div className="left" id="left_nav_dashboard_border">
                <img alt="" src={Dashboard_Icon}/>
            </div>
            <div className="right"><span>Dashboard</span></div>
        </div>
        </Link>
      </div>

      <div id="link_dashboard" style={{marginBottom: "10px"}}>
        <Link to="#" style={{textDecoration:"none"}}>
        <div className="link_container" id="admin_dashboard_link">
            <div className="left" id="left_nav_dashboard_border">
                <img alt="" src={Profile_Icon}/>
            </div>
            <div className="right"><span>Profile</span></div>
        </div>
        </Link>
      </div>
      
      <div id="link_dashboard" style={{marginBottom: "10px"}}>
        <Link to="#" style={{textDecoration:"none"}}>
        <div className="link_container" id="admin_dashboard_link">
            <div className="left" id="left_nav_dashboard_border">
                <img alt="" src={geotagging_icon}/>
            </div>
            <div className="right"><span>Geotagging</span></div>
        </div>
        </Link>
      </div>
            
      <div id="link_Settings" style={{marginBottom: "10px"}}>
        <Link to="#" style={{textDecoration:"none"}}>
        <div className="link_container" id="admin_Settings_link">
          <div className="left" id="left_nav_settings_border">
            <img alt="" src={Schedule_Icon}/>
          </div>
          <div className="right"><span>Schedule</span></div>
        </div>
        </Link>
      </div>
    </div>

    <div className="second" style={{marginBottom:"20px"}}>
        <Link to="/" style={{textDecoration:"none"}}>
        <div className="link_container">
          <div className="left">
            <img alt="" src={Sign_Out_Icon}/>
          </div>
          <div className="right"><span>Sign out</span></div>
        </div>
        </Link>
    </div>
   </div>
)
}