import React from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function TaskBox_Component(props){
//View task modals
function ViewTaskModal(){
    document.getElementById("view_task_modal_container").style.display = "flex";
    document.getElementById("task_title").textContent = props.title;
    document.getElementById("task_description").textContent = props.description;
    document.getElementById("task_time").textContent = props.time;
    document.getElementById("task_date").textContent = props.date;
}

    return(
    <div className="box" onClick={ViewTaskModal}>
      <div className="left">
        <AssignmentIcon id="task_icon"/>
        <p>{props.time}</p>
      </div>
      <div className="right">
        <p>{props.title}</p>
      </div>
    </div>   
    )
}