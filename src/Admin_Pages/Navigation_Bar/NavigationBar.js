import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "./NavigationBar.css";

import Dashboard_Icon from "../../Assets/Icons/Dashboard_Icon.png";
import Schedule_Icon from "../../Assets/Icons/Schedule_Icon.png";
import Patients_Icon from "../../Assets/Icons/Patients_Icon.png";
import Vaccine_Icon from "../../Assets/Icons/Vaccine_Icon.png";
import Setting_Icon from "../../Assets/Icons/Setting_Icon.png";
import Website_Logo from "../../Assets/Logo/Logo.png";
import Mini_Logo from "../../Assets/Logo/Mini_Logo.png";

export default function Admin_Navigation_Bar(){

//If local storage email has no value it can't acces admin pages
const [auth, setAuth] = useState("");
let navigate = useNavigate();

useEffect(() => {
  var auth = localStorage.getItem("admin_login_email");
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
  document.getElementsByClassName("admin_navigation_bar_container")[0].style.width = "250px";
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
      <div className="top">
          <img src={Mini_Logo} alt="" id="mini_logo"/>
          <img src={Website_Logo} alt="" style={{display:"none"}} id="whole_logo"/>
      </div>


      <div id="link_dashboard">
        <Link to="#" style={{textDecoration:"none"}}>
        <div className="link_container" id="admin_dashboard_link">
            <div className="left" id="left_nav_border">
                <img alt="" src={Dashboard_Icon}/>
            </div>
            <div className="right"><span>Dashboard</span></div>
        </div>
        </Link>
      </div>

      <Link to="#" style={{textDecoration:"none"}}>
      <div className="link_container">
          <div className="left">
              <img alt="" src={Schedule_Icon}/>
          </div>
          <div className="right">
            <span>Manage Schedule</span>
            <LightTooltip title="Expand">
              <span>&#x3e;</span>
            </LightTooltip>
            </div>
      </div>
       </Link>

      <Link to="#" style={{textDecoration:"none"}}>
      <div className="link_container">
          <div className="left">
              <img alt="" src={Patients_Icon}/>
          </div>
          <div className="right"><span>Manage Patients</span>
          <LightTooltip title="Expand">
              <span>&#x3e;</span>
            </LightTooltip>
          </div>
      </div>
       </Link>

      <Link to="#" style={{textDecoration:"none"}}>
      <div className="link_container">
          <div className="left">
              <img alt="" src={Vaccine_Icon}/>
          </div>
          <div className="right"><span>Manage Vaccines</span>
          <LightTooltip title="Expand">
              <span>&#x3e;</span>
          </LightTooltip></div>
      </div>
       </Link>

      <Link to="#" style={{textDecoration:"none"}}>
      <div className="link_container">
          <div className="left">
              <img alt="" src={Setting_Icon}/>
          </div>
          <div className="right"><span>Settings</span></div>
      </div>
       </Link>

   </div>
)
}