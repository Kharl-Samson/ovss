import React from "react";
import WarningIcon from '@mui/icons-material/Warning';
import Close_Icon from "./Images/Close_Icon.png";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "./modal.css";

export default function ValidatorSlideModal(props){

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

  function close_Validator_modal(){
    document.getElementById("image_validator_container").style.left = "-100%";
  }

    return(
    <div className="slide_modal_container" id="image_validator_container" style={{backgroundColor:"red",width:"auto"}}>
        <div className="icon">
            <WarningIcon style={{color:"white"}}/>
        </div>
        <p>{props.validatorText}</p>
        <div className="icon">
           <LightTooltip title="Close">
              <img alt="" src={Close_Icon} id="close_slide_modal" onClick={close_Validator_modal}/>
           </LightTooltip>
        </div>
    </div>
    )
}