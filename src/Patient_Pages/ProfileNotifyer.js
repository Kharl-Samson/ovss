import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import Dashboard_Icon from "../Assets/Icons/Dashboard_Icon.png";
import Profile_Icon from "../Assets/Icons/Profile_Icon.png";
import person_notifyer from "../Assets/Icons/person_notifyer.gif";
import hand_mouse from "../Assets/Icons/hand_mouse.png";

import Website_Logo from "../Assets/Logo/Logo.png";
import Mini_Logo from "../Assets/Logo/Mini_Logo.png";

export default function ProfileNotifyer() {
  //for getting the initial name in avatar

  //Tooltip
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: ".8rem",
    },
  }));




  return (
    <div
      className="profile_notify_container"
      id="profile_notify_container"
    >

        <div className="admin_navigation_bar_container" style={{width:"265px"}}>
            <div className="first">
             <div className="top">
                <img src={Mini_Logo} alt="" id="mini_logo"  style={{display:"none"}}/>
                <img src={Website_Logo} alt="" id="whole_logo"/>
             </div>
             <div id="link_dashboard" style={{marginBottom: "10px",visibility:"hidden"}}>
                <div className="link_container" id="admin_dashboard_link">
                    <div className="left" id="left_nav_dashboard_border">
                        <img alt="" src={Dashboard_Icon}/>
                    </div>
                    <div className="right"><span>Dashboard</span></div>
                </div>
             </div>
             <div id="link_Profile" style={{marginBottom: "10px",backgroundColor:"#ffff"}}>
              <Link to="/Patient_View_Profile" style={{textDecoration:"none"}}>
              <div className="link_container" id="admin_profile_link" style={{backgroundColor:"#e7e7ff"}}>
                  <div className="left" id="left_nav_profile_border" style={{borderLeft:"5px solid #4D77FF"}}>
                      <img alt="" src={Profile_Icon}/>
                  </div>
                  <div className="right"><span>Profile</span></div>
              </div>
              </Link>
             </div>
             <center>
                <img src={hand_mouse} className="hand_mouse" />
            </center>
            </div>
        </div>

        <div className="robot_container">
            <div className="left">
            <img src={person_notifyer} />
            </div>
            <div className="right">
            <div className="convo_box">
                <p>Hey {localStorage.getItem("patient_login_firstname")}! &#128522;</p>
                <p id="typewriter1">It seems that your profile is not yet complete.</p>
                <p id="typewriter2">You can go to the Profile page and finish your</p>
                <p id="typewriter3">account setup!</p>
            </div>
            </div>
        </div>

    </div>
  );
}


