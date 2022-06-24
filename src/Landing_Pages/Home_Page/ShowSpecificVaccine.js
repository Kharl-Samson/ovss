import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Injection_Icon_with_background from "../../Assets/Icons/Injection_Icon_with_background.png";

export default function Show_Specific_Vaccine(){

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
function Close_specific_vaccine_function(){
    document.getElementsByClassName("specific_vaccine_container")[0].style.display = "none";
    document.getElementsByClassName("vaccine_container")[0].style.marginRight = "-100%";
}

    return(
    <div className="specific_vaccine_container">
        <div className="vaccine_container">
            <LightTooltip title="Close">
                <div className="close_btn" onClick={Close_specific_vaccine_function}>&#215;</div>
            </LightTooltip>

            <div className="scrollabe_div">
              <div className="top">
                <img id="specific_announcement_img" alt="" src={Injection_Icon_with_background}/>
                <div className="headline_container">
                    <p id="specific_vaccine_headline1" className="specific_vaccine_headline"></p>
                    <p id="specific_vaccine_headline2" className="specific_vaccine_headline"></p>
                </div>
              </div>

              <div className="line"></div>

               <div className="bottom">
                    <p id="vaccine_question1" className="vaccine_question"></p>
                    <p id="vaccine_content1" className="vaccine_content"> </p>

                    <p id="vaccine_question2" className="vaccine_question"></p>
                    <p id="vaccine_content2" className="vaccine_content"> </p>

                    <p id="vaccine_question3" className="vaccine_question"></p>
                    <p id="vaccine_content3" className="vaccine_content"> </p>
               </div>
            </div>

        </div>
    </div>
    )
}