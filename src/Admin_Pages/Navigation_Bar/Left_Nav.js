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
import Schedule_Icon from "../../Assets/Icons/Schedule_Icon.png";
import Patients_Icon from "../../Assets/Icons/Patients_Icon.png";
import Vaccine_Icon from "../../Assets/Icons/Vaccine_Icon.png";
import Setting_Icon from "../../Assets/Icons/Setting_Icon.png";
import View_Schedule_Icon from "../../Assets/Icons/View_Schedule_Icon.png";
import Approved_Schedule_Icon from "../../Assets/Icons/Approved_Schedule_Icon.png";
import Add_Patient_Icon from "../../Assets/Icons/Add_Patient_Icon.png";
import View_Patient_Icon from "../../Assets/Icons/View_Patient_Icon.png";
import Add_Vaccine_Icon from "../../Assets/Icons/Add_Vaccine_Icon.png";
import Vaccine_Report_Icon from "../../Assets/Icons/Vaccine_Report_Icon.png";
import Sign_Out_Icon from "../../Assets/Icons/Sign_Out_Icon.png";
import Website_Logo from "../../Assets/Logo/Logo.png";
import Mini_Logo from "../../Assets/Logo/Mini_Logo.png";

export default function Admin_Left_Navigation_Bar(){

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
  document.getElementsByClassName("admin_navigation_bar_container")[0].style.width = "265px";
  document.getElementById("mini_logo").style.display = "none";
  document.getElementById("whole_logo").style.display = "block";
}
function remove_hover_navbar(){
  document.getElementsByClassName("admin_navigation_bar_container")[0].style.width = "75px";
  document.getElementById("mini_logo").style.display = "block";
  document.getElementById("whole_logo").style.display = "none";
}


//Expanding nav buttons 
var mng_sched_ctr = 0;
function manage_schedule_choice(){
  mng_sched_ctr++;
  mng_patient_ctr = 0;
  mng_vaccine_ctr = 0;
  if(mng_sched_ctr % 2 === 0) {
    document.getElementById("manage_schedule_choice").style.display = "none";
    document.getElementById("expand_span_sched").style.transform = "rotate(0deg)";
  }
  else{
    document.getElementById("manage_schedule_choice").style.display = "block";
    document.getElementById("expand_span_sched").style.transform = "rotate(90deg)";
  }  

  document.getElementById("manage_patient_choice").style.display = "none";
  document.getElementById("expand_span_patient").style.transform = "rotate(0deg)";
  document.getElementById("manage_vaccine_choice").style.display = "none";
  document.getElementById("expand_span_vaccine").style.transform = "rotate(0deg)";
}

var mng_patient_ctr = 0;
function manage_patient_choice(){
  mng_patient_ctr++;
  mng_sched_ctr = 0;
  mng_vaccine_ctr = 0;
  if(mng_patient_ctr % 2 === 0) {
    document.getElementById("manage_patient_choice").style.display = "none";
    document.getElementById("expand_span_patient").style.transform = "rotate(0deg)";
  }
  else{
    document.getElementById("manage_patient_choice").style.display = "block";
    document.getElementById("expand_span_patient").style.transform = "rotate(90deg)";
  }  

  document.getElementById("manage_schedule_choice").style.display = "none";
  document.getElementById("expand_span_sched").style.transform = "rotate(0deg)";
  document.getElementById("manage_vaccine_choice").style.display = "none";
  document.getElementById("expand_span_vaccine").style.transform = "rotate(0deg)";
}

var mng_vaccine_ctr = 0;
function manage_vaccine_choice(){
  mng_vaccine_ctr++;
  mng_sched_ctr = 0;
  mng_patient_ctr = 0;
  if(mng_vaccine_ctr % 2 === 0) {
    document.getElementById("manage_vaccine_choice").style.display = "none";
    document.getElementById("expand_span_vaccine").style.transform = "rotate(0deg)";
  }
  else{
    document.getElementById("manage_vaccine_choice").style.display = "block";
    document.getElementById("expand_span_vaccine").style.transform = "rotate(90deg)";
  }  

  document.getElementById("manage_schedule_choice").style.display = "none";
  document.getElementById("expand_span_sched").style.transform = "rotate(0deg)";
  document.getElementById("manage_patient_choice").style.display = "none";
  document.getElementById("expand_span_patient").style.transform = "rotate(0deg)";
}

//Function remove expand nav
setInterval(function () {
 if(document.getElementsByClassName("admin_navigation_bar_container")[0].clientWidth === 75){
    document.getElementById("manage_schedule_choice").style.display = "none";
    document.getElementById("expand_span_sched").style.transform = "rotate(0deg)";
    document.getElementById("manage_patient_choice").style.display = "none";
    document.getElementById("expand_span_patient").style.transform = "rotate(0deg)";
    document.getElementById("manage_vaccine_choice").style.display = "none";
    document.getElementById("expand_span_vaccine").style.transform = "rotate(0deg)";
    mng_sched_ctr = 0;
    mng_patient_ctr = 0;
    mng_vaccine_ctr = 0;
  }
}, 100);


return(
   <div className="admin_navigation_bar_container" onMouseOver={hover_navbar} onMouseOut={remove_hover_navbar}>

    <div className="first">
      <div className="top">
          <img src={Mini_Logo} alt="" id="mini_logo"/>
          <img src={Website_Logo} alt="" style={{display:"none"}} id="whole_logo"/>
      </div>


      <div id="link_dashboard" style={{marginBottom: "10px"}}>
        <Link to="/Administration_Dashboard" style={{textDecoration:"none"}}>
        <div className="link_container" id="admin_dashboard_link">
            <div className="left" id="left_nav_dashboard_border">
                <img alt="" src={Dashboard_Icon}/>
            </div>
            <div className="right"><span>Dashboard</span></div>
        </div>
        </Link>
      </div>
      
      <div className="link_container" id="admin_schedule_link" style={{marginBottom: "10px"}} onClick={manage_schedule_choice}>
        <div className="left" id="left_nav_sched_border">
            <img alt="" src={Schedule_Icon}/>
        </div>
        <div className="right">
          <span>Manage Schedule</span>
          <LightTooltip title="Expand">
            <span id="expand_span_sched">&#x3e;</span>
          </LightTooltip>
        </div>
      </div>
   
              <div className="choice_container" id="manage_schedule_choice">

              
              <div id="link_pending_sched">
                <Link to="/Administration_Pending_Schedule" style={{textDecoration:"none"}}>
                <div className="link_container" id="admin_pending_schedule_link">
                  <div className="left" id="left_nav_pending_sched_border">
                      <img alt="" src={View_Schedule_Icon}/>
                  </div>
                  <div className="right">
                    <span>Pending Schedule</span>
                  </div>
                </div>
                </Link>
              </div>  
              
              <div id="link_approved_sched">
                <Link to="/Administration_Approved_Schedule" style={{textDecoration:"none"}}>
                <div className="link_container" id="admin_approved_schedule_link">
                  <div className="left" id="left_nav_approved_sched_border">
                      <img alt="" src={Approved_Schedule_Icon}/>
                  </div>
                  <div className="right">
                    <span>Approved Schedule</span>
                  </div>
                </div>
                </Link>
              </div>  
              
              <div id="link_history_sched">
                <Link to="/Administration_History_Schedule" style={{textDecoration:"none"}}>
                <div className="link_container" id="admin_history_schedule_link">
                  <div className="left" id="left_nav_history_sched_border">
                      <img alt="" src={Schedule_Icon}/>
                  </div>
                  <div className="right">
                    <span>Schedule History</span>
                 </div>
                </div>
                </Link>
              </div>  

              </div>

      <div className="link_container" style={{marginBottom: "10px"}} onClick={manage_patient_choice}>
          <div className="left">
              <img alt="" src={Patients_Icon}/>
          </div>
          <div className="right"><span>Manage Patients</span>
          <LightTooltip title="Expand">
              <span id="expand_span_patient">&#x3e;</span>
            </LightTooltip>
          </div>
      </div>

              <div className="choice_container" id="manage_patient_choice">
                <div className="link_container">
                  <div className="left">
                      <img alt="" src={Add_Patient_Icon}/>
                  </div>
                  <div className="right">
                    <span>Add  Patients</span>
                  </div>
                </div>

                <div className="link_container">
                  <div className="left">
                      <img alt="" src={View_Patient_Icon}/>
                  </div>
                  <div className="right">
                    <span>View  Patients</span>
                  </div>
                </div>
              </div>



      <div className="link_container" style={{marginBottom: "10px"}} id="admin_vax_link" onClick={manage_vaccine_choice}>
          <div className="left" id="left_nav_vaccine_border">
              <img alt="" src={Vaccine_Icon}/>
          </div>
          <div className="right"><span>Manage Vaccines</span>
          <LightTooltip title="Expand">
              <span id="expand_span_vaccine">&#x3e;</span>
          </LightTooltip></div>
      </div>


              <div className="choice_container" id="manage_vaccine_choice">
                <div className="link_container">
                  <div className="left">
                      <img alt="" src={Add_Vaccine_Icon}/>
                  </div>
                  <div className="right">
                    <span>Add Vaccine</span>
                  </div>
                </div>

              <div id="link_vaccine_report">
                <Link to="/Administration_Vaccine_Management" style={{textDecoration:"none"}}>
                <div className="link_container" id="admin_Vaccine_Management_link">
                  <div className="left" id="left_nav_Vaccine_Management_border">
                      <img alt="" src={Vaccine_Report_Icon}/>
                  </div>
                  <div className="right">
                    <span>Vaccine Report</span>
                  </div>
                </div>
                </Link>
              </div>  

              </div>

      <div id="link_dashboard" style={{marginBottom: "10px"}}>
        <Link to="#" style={{textDecoration:"none"}}>
        <div className="link_container">
          <div className="left">
            <img alt="" src={Setting_Icon}/>
          </div>
          <div className="right"><span>Settings</span></div>
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