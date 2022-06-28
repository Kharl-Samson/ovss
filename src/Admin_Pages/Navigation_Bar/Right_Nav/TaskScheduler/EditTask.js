import React from "react";
import "./Modal.css";
import Task_Icon from "./Task_Icon.png";

export default function Edit_Task_Modal(props){

    function CloseTaskModal(){
        document.getElementById("edit_task_modal_container").style.display = "none";
    }


return(
    <div className="modal_container" id="edit_task_modal_container">
    <div className='task_modal'>
        <div className='top'>
            <img src={Task_Icon}/>
            <div className='header'>
                <p>Update your tasks</p>
                <p>Edit some information about the task</p>
            </div>
            <div className='close_btn'><span title="Close" onClick={CloseTaskModal}>&#215;</span></div>
        </div>

        <form style={{width: "100%"}} onSubmit={props.formAction}>
        <div className='task_form'>
            <label>Title <span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <input type="text" placeholder="Task title here..." className='task_input' id="edit_task_title_input" name="title" required/>

            <label>Description <span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <textarea className='task_input' placeholder="Task description here..." id="edit_task_description_input" name="description" required></textarea>

            <label>Date<span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <input type="date" className='task_input'  min={new Date().toISOString().split('T')[0]} id="edit_task_date_input" name="date" required/>

            <label>Time<span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <input type="time" className='task_input' name="time" id="edit_task_time_input" required />
            <input type="hidden"  id="edit_task_key"  required/>
        </div>

        <div className='submit_container'>
            <button type="button" onClick={CloseTaskModal}>Cancel</button>
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
    </div>
)
}