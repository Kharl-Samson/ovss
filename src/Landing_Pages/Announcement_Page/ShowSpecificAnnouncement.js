import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function Show_Specific_Announcement(){

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

//Close all information in latest announcements
function Close_latest_specific_announcements_function(){
    document.getElementsByClassName("specific_announcement_container")[0].style.display = "none";
    document.getElementsByClassName("announcement_container")[0].style.marginRight = "-100%";
}

    return(
    <div className="specific_announcement_container">
        <div className="announcement_container">
            <LightTooltip title="Close">
                <div className="close_btn" onClick={Close_latest_specific_announcements_function}>&#215;</div>
            </LightTooltip>

            <div className="scrollabe_div">
              <div className="top">
                <img src={localStorage.getItem("url_announcement")+"announcements_template.png"} alt=""/>
                <div className="headline_container">
                    <p id="specific_announcement_date"></p>
                    <p id="specific_announcement_headline"></p>
                </div>
              </div>

               <div className="bottom">
                    <p id="announcement_content"></p>
               </div>
            </div>

        </div>
    </div>
    )
}