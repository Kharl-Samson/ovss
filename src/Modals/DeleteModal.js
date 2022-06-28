import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Delete_Icon from "../Assets/Icons/Delete_Icon.png";

export default function Delete_Modal(props){

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

function Close_Task_Delete_Modal(){
   document.getElementById("delete_task_modal_container").style.display = "none";
}

return(
 <div className="modal_container" id="delete_task_modal_container">
    <div className="delete_task_container">
       <div className="top_modal">
            <div className="left">
               <img alt="" src={Delete_Icon}/>
               {props.title}
            </div>
            <div className="close_modal_btn"><LightTooltip title="Close"><span onClick={Close_Task_Delete_Modal}>&#215;</span></LightTooltip></div>
       </div>

       <div className="middle_modal">
         <p>{props.description}</p>
       </div>

      <div className="bottom_modal">
      <form onSubmit={props.formAction}>
         <input type="hidden" id="delete_modal_key"/>
         <button type="button" onClick={Close_Task_Delete_Modal}>Cancel</button>
         <button type="submit">Delete</button>
      </form>
      </div>
     

    </div>
 </div>
)
}