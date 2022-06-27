import React from "react";
import "./Modal.css";
import Task_Icon from "./Task_Icon.png";
import { useState } from "react";
import axios from "axios";

export default function Add_Task_Modal(){

    function CloseTaskModal(){
        document.getElementById("add_task_modal_container").style.display = "none";
        var input =  document.getElementsByClassName("task_input");
        for(var i=0; i< input.length; i++){
            input[i].value = "";
        }
    }

    //Getting the value of all input when submitting the form
    const submitForm=(e)=>{
        e.preventDefault();
            //Sending the data request to call it on backend
            const sendData = {
                email: document.getElementById("task_email_input").value,
                title: document.getElementById("task_title_input").value,
                description: document.getElementById("task_description_input").value,
                date: document.getElementById("task_date_input").value,
                time: document.getElementById("task_time_input").value
            }
            //Sending the data to my backend
            axios.post(localStorage.getItem("url_hosting")+'Add_Task.php',sendData)
            .then((result)=>{ 
                if(result.data.status === "Success"){
                    alert("Sucess")
                }
                else{
                    alert("sql error")
                }
            })//End of axios       
    }
      
    return(
    <div className="modal_container" id="add_task_modal_container">
    <div className='task_modal'>
        <div className='top'>
            <img src={Task_Icon}/>
            <div className='header'>
                <p>Create a tasks</p>
                <p>Add some information about the task</p>
            </div>
            <div className='close_btn'><span title="Close" onClick={CloseTaskModal}>&#215;</span></div>
        </div>

        <form style={{width: "100%"}} onSubmit={submitForm}>
        <div className='task_form'>
            <label>Title <span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <input type="text" placeholder="Task title here..." className='task_input' id="task_title_input" name="title" required/>

            <label>Description <span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <textarea className='task_input' placeholder="Task description here..." id="task_description_input" name="description" required></textarea>

            <label>Date<span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <input type="date" className='task_input'  min={new Date().toISOString().split('T')[0]} id="task_date_input" name="date" required/>

            <label>Time<span style={{color: "red", fontSize: "1rem"}}>*</span></label>
            <input type="time" className='task_input' name="time" id="task_time_input" required />
            <input type="hidden"  name="email" id="task_email_input" value={localStorage.getItem('admin_email_input')} required/>
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


