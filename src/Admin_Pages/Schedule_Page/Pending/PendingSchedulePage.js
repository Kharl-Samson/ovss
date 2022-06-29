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
import No_Records_Available from "../Images/No_Records_Available.png";

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import EachPendingRow from "./EachPendingRow";
import $ from 'jquery'; 

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


  //Temporary Array
  const array_pending_schedule = ['1','2','1','2','1','2','1','2','1','2','1','2'];
  var array_pending_schedule_ctr = -1;
  const box_pending_schedule = array_pending_schedule.map((res) => {
    array_pending_schedule_ctr++;
      return (
        <EachPendingRow
          propsKey = {array_pending_schedule_ctr}
        />
      );
  });


//Filter Search
function search_Schedule(){
  var value = document.getElementById("search_pending_schedule").value;
  value = value.toLowerCase();
  $("#header_body .table_tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
    
  if($('#header_body .table_tr:visible').length === 0) {//if not found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "flex";
  }
  else if($('#header_body .table_tr:visible').length !== 0){//if found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
  if(document.getElementById("table_tr").value.length === 0){
    document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
}
    

    return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">
                <h1>Pending <span style={{color:"#4D77FF"}}>Schedules</span></h1>


                {array_pending_schedule_ctr === -1 ?
                "" 
                :   
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
                        <input type="text" placeholder="Search here" id="search_pending_schedule" onKeyUp={search_Schedule}/>
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
                }

                <div className="header_table">
                  <div className="header1">
                    <input type="checkbox"/>
                  </div>
                  <div className="header2">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>DATE RECEIVED</span>
                  </div>
                  <div className="header3">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>REQUESTED BY</span>
                  </div>
                  <div className="header4">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>CONCACT</span>
                  </div>
                  <div className="header5">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>STATUS</span>
                  </div>
                  <div className="header6">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>ACTIONS</span>
                  </div>
                </div>

                <div className="header_table header_body" id="header_body">
                    {array_pending_schedule_ctr === -1 ?
                    <div className='no_schedule_available no_schedule_available1'>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No schedule available</p>
                    </div>  :   box_pending_schedule
                   } 

                    <div div className='no_schedule_available no_schedule_available2' style={{display:"none"}}>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No schedule found</p>
                    </div> 
                </div>

                <div className="bottom_sched">
                   <p>{"Total of "+array_pending_schedule_ctr+" pending schedules"}</p>
                   <div className="btn">
                        <button>Reject All</button>
                        <button>Accept All</button>
                   </div>
                </div>

            </div>
        </div>
            
    <Admin_Right_Navigation_Bar/>
    </div>
</div>
    )
}