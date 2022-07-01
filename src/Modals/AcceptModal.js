import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Accept_Icon from "./Images/Accept_Icon.png";

export default function Accept_Modal(props){

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

function Close_Accept_Modal(){
   document.getElementById("Accept_sched_modal_container").style.display = "none";
}

return(
 <div className="modal_container" id="Accept_sched_modal_container">
    <div className="delete_task_container">
       <div className="top_modal">
            <div className="left">
               <img alt="" src={Accept_Icon} style={{borderRadius:"50%"}}/>
               {props.title}
            </div>
            <div className="close_modal_btn"><LightTooltip title="Close"><span onClick={Close_Accept_Modal}>&#215;</span></LightTooltip></div>
       </div>

       <div className="middle_modal">
         <p>{props.description}</p>
       </div>

      <div className="bottom_modal">
      <form onSubmit={props.formAction}>
         <input type="hidden" id="accept_modal_key"/>
         <input type="hidden" id="email_accept_key"/>
         <input type="hidden" id="name_accept_key"/>
         <input type="hidden" id="date_accept_key"/>
         <button type="button" onClick={Close_Accept_Modal}>Cancel</button>
         <button type="submit" style={{backgroundColor:"#3498db"}}>Accept</button>
      </form>
      </div>
    </div>
 </div>
)
}