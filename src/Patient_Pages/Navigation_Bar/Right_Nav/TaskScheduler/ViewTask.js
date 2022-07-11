import React from "react";
import Task_Icon from "./Task_Icon.png";
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ViewTaskModal(){
    function CloseTaskModal(){
        document.getElementById("view_task_modal_container").style.display = "none";
    }
    return(
    <div className="modal_container" id="view_task_modal_container">

    <div className='task_modal'>
        <div className='top'>
            <div style={{display:"flex"}}>
            <img src={Task_Icon}/>
            <div className='header'>
                <p>Task Scheduler</p>
                <p>Information about your task</p>
            </div>
            </div>
            <div className='close_btn'><span title="Close" onClick={CloseTaskModal}>&#215;</span></div>
        </div>

        <div className='task_form'>
            <div style={{display:"flex",alignItems:"flex-end", color: "#616263"}}>
                <SubtitlesIcon style={{marginRight :"5px"}}/>
                <label>Title</label>
            </div>
            <p style={{fontSize: "1rem", marginBottom: "15px",marginTop:"5px"}} id="task_title"></p>

            <div style={{display:"flex",alignItems:"flex-end", color: "#616263"}}>
                <DescriptionIcon style={{marginRight :"5px"}}/>
                <label>Description</label>
            </div>
            <p style={{fontSize: "1rem", marginBottom: "15px",marginTop:"5px"}}  id="task_description"></p>

            <div style={{display:"flex",alignItems:"flex-end", color: "#616263"}}>
                <DateRangeIcon style={{marginRight :"5px"}}/>
                <label>Date</label>
            </div>
            <p style={{fontSize: "1rem", marginBottom: "15px",marginTop:"5px"}} id="task_date"></p>

            <div style={{display:"flex",alignItems:"flex-end", color: "#616263"}}>
                <AccessTimeIcon style={{marginRight :"5px"}}/>
                <label>Time</label>
            </div>
            <p style={{fontSize: "1rem", marginBottom: "15px",marginTop:"5px"}} id="task_time"></p>
        </div>
    </div>
    </div>
    )
}