import React from "react";
import Check_Icon from "./Images/Check_Icon.png";
import Close_Icon from "./Images/Close_Icon.png";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "./modal.css";

export default function SuccesSlideModal(){

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

  function close_slide_modal(){
    document.getElementById("slide_modal_container").style.left = "-100%";
  }

    return(
    <div className="slide_modal_container" id="slide_modal_container">
        <div className="icon">
            <img alt="" src={Check_Icon}/>
        </div>
        <p>Action was process succesfully!</p>
        <div className="icon">
           <LightTooltip title="Close">
              <img alt="" src={Close_Icon} id="close_slide_modal" onClick={close_slide_modal}/>
           </LightTooltip>
        </div>
    </div>
    )
}