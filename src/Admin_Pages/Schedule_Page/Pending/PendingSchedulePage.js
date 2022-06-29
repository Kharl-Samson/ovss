import React from "react";
import "../Schedule.css";
import Admin_Left_Navigation_Bar from "../../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from "../../Navigation_Bar/Right_Nav";
import TabLogo from "../../../Assets/Logo/Tab_Logo.png";
import Search_Icon from "../Images/Search_Icon.png";
import Mic_Icon from "../Images/Mic_Icon.png";
import Calendar_Icon from "../Images/Calendar_Icon.png";
import Report_Icon from "../Images/Report_Icon.png";
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function Admin_Pending_Schedule_Page(){

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

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Schedule";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_pending_sched").style.pointerEvents="none";
    document.getElementById("admin_pending_schedule_link").style.backgroundColor = "#FFF7DB";
    document.getElementById("left_nav_pending_sched_border").style.borderLeft = "5px solid #E2AB1D";
    document.getElementById("left_nav_sched_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_schedule_link").style.backgroundColor = "#e7e7ff";
    
  }, 10);


    return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">
                <h1>Pending <span style={{color:"#4D77FF"}}>Schedules</span></h1>

                <div className="schedule_top">

                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                   <div className="left">
                   <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >

                      <div className="search_container">
                        <div className="icon">
                          <img alt="" src={Search_Icon}/>
                        </div>
                        <input type="text" placeholder="Search here"/>
                        <div className="icon">
                          <LightTooltip title="Search by voice">
                            <img alt="" src={Mic_Icon}/>
                          </LightTooltip>
                        </div>
                      </div>

                      <LightTooltip title="Filter by date">
                      <div className="search_container filter_date" style={{width:"220px"}}>
                        <input type="text" className="filter_date" placeholder="Filter Date" style={{textIndent:"10px"}} disabled/>
                        <div className="icon" style={{borderLeft:"1.5px solid rgb(150, 150, 150)"}}>
                            <img alt="" src={Calendar_Icon}/>
                        </div>
                      </div>
                      </LightTooltip>
                   </Grid>
                   </div>

                   <div className="right">
                     <LightTooltip title="Export into PDF file">
                      <div className="search_container" style={{width:"auto"}}>
                        <div className="icon" style={{borderRight:"1.5px solid rgb(150, 150, 150)"}}>
                          <img alt="" src={Report_Icon}/>
                        </div>
                        <span>Generate Report</span>
                      </div>
                     </LightTooltip>
                   </div>
                </Grid>

                </div>

            </div>
        </div>
            
    <Admin_Right_Navigation_Bar/>
    </div>
</div>
    )
}