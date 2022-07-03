import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Delete_Icon from "../Assets/Icons/Delete_Icon.png";
import CircularProgress from '@mui/material/CircularProgress';

export default function Reject_Modal(props){

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

function Close_Reject_Sched_Modal(){
   document.getElementById("reject_sched_modal_container").style.display = "none";
}

return(
 <div className="modal_container" id="reject_sched_modal_container">
    <div className="delete_task_container">
       <div className="top_modal">
            <div className="left">
               <img alt="" src={Delete_Icon}/>
               {props.title}
            </div>
            <div className="close_modal_btn"><LightTooltip title="Close"><span onClick={Close_Reject_Sched_Modal}>&#215;</span></LightTooltip></div>
       </div>

       <div className="middle_modal">
         <p>{props.description}</p>
       </div>

      <div className="bottom_modal">
      <form onSubmit={props.formAction}>
         <input type="hidden" id="reject_schedule_modal_key"/>
         <input type="hidden" id="email_reject_key"/>
         <input type="hidden" id="name_reject_key"/>
         <input type="hidden" id="date_reject_key"/>
         <button type="submit">
            <center>
               <CircularProgress color="inherit" id="progress_btn_schedule_modal" className="progress_btn_schedule_modal"/>
            </center>      
            <span className="text_btn_sched_Vax">Reject</span>
         </button>
         <button type="button" onClick={Close_Reject_Sched_Modal}>
            <span>Cancel</span>
         </button>
      </form>
      </div>
     

    </div>
 </div>
)
}