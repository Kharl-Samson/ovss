import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TaskIcon from '@mui/icons-material/Task';
import No_Records_Available from "../Right_Nav/No_Records_Available.png";
import Add_Task_Modal from "./TaskScheduler/AddTask";
import axios from "axios";

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ViewTaskModal from './TaskScheduler/ViewTask';
import TaskBox_Component from './TaskScheduler/EachTaskBox';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';
import SearchIcon  from "../Right_Nav/search.svg";
import TaskBoxAll_component from './TaskScheduler/EachTaskboxAll';
import Delete_Modal from '../../../Modals/DeleteModal';
import Edit_Task_Modal from './TaskScheduler/EditTask';
import $ from 'jquery'; 


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}


export default function Middle_Nav_Part(){

    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);
        const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    

   //date today    
   let startdate1 = moment().subtract(3, "days");
   let startdate2 = moment().subtract(2, "days");
   let startdate3 = moment().subtract(1, "days");
   let startdate4 = moment().subtract(0, "days");
   let startdate5 = moment().add(1, "days");
   let startdate6 = moment().add(2, "days");
   let startdate7 = moment().add(3, "days");
        
   const startdate_array = [startdate1,startdate2,startdate3,startdate4,startdate5,startdate6,startdate7];
   const today_arrayConverterd = [];
   const today_array = [];
   const initialday = [];
   var x;
   for(x = 0 ; x < 7 ; x++){
      today_arrayConverterd.push(startdate_array[x].format("L"));
      initialday.push(startdate_array[x] ? startdate_array[x].format("dddd").substring(0,3)  : '');
      today_array.push(startdate_array[x].format("DD"));
   }
    
   var taskDateValue =  new Date().toISOString().slice(0, 10);

   //Showing add task modal
   function show_add_task_modal(){
    document.getElementById("add_task_modal_container").style.display = "flex";
   }

  //getting the email of user
  let email_key = localStorage.getItem('admin_login_email');
  //Hook for view the list of task of user
  const [task, setTask] = useState([]);  

  const loadTasks = async () =>{
      const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Task.php");
      setTask(result.data.phpresult);
  };

  useEffect(() => {
      loadTasks();
  }, []);

  //Task box container using map
  var key_task_ctr_Am = 0;
  const Task_box_Am = task.map((res)=> {
    var time_AM = res.time.slice(-2);
    if(res.email === email_key && res.date === localStorage.getItem("taskDateValue")){    
      if(time_AM === "am"){
      key_task_ctr_Am++;
        return (
        <TaskBox_Component
          key = {key_task_ctr_Am}
          id = {res.id}
          title = {res.title}
          description = {res.description}
          time = {res.time}
          date = {res.date}
        />
    )}}
    else if(res.email === email_key && localStorage.getItem("taskDateValue") === "" && res.date === taskDateValue){
      if(time_AM === "am"){
      key_task_ctr_Am++;
      return (
      <TaskBox_Component
        key = {key_task_ctr_Am}
        id = {res.id}
        title = {res.title}
        description = {res.description}
        time = {res.time}
        date = {res.date}
      /> 
  )}}})

  //Task box container using map
  var key_task_ctr_Pm = 0;
  const Task_box_Pm= task.map((res)=> {
    var time_PM = res.time.slice(-2);
    if(res.email === email_key && res.date === localStorage.getItem("taskDateValue")){    
      if(time_PM === "pm"){
      key_task_ctr_Pm++;
        return (
        <TaskBox_Component
          key = {key_task_ctr_Pm}
          id = {res.id}
          title = {res.title}
          description = {res.description}
          time = {res.time}
          date = {res.date}
        />
    )}}
    else if(res.email === email_key && localStorage.getItem("taskDateValue") === "" && res.date === taskDateValue){
      if(time_PM === "pm"){
      key_task_ctr_Pm++;
      return (
      <TaskBox_Component
        key = {key_task_ctr_Pm}
        id = {res.id}
        title = {res.title}
        description = {res.description}
        time = {res.time}
        date = {res.date}
      />
    )}}})

  //Task box container using map
  var key_task_ctr_All = 0;
  const Task_box_All= task.map((res)=> {
    if(res.email === email_key){    
      key_task_ctr_All++;
        return (
          <TaskBoxAll_component
            key = {key_task_ctr_All}
            id = {res.id}
            title = {res.title}
            description = {res.description}
            time = {res.time}
            date = {res.date}
          />  
    )}})


  //Form of add task
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
            handleClick(TransitionLeft);
            document.getElementById("add_task_modal_container").style.display = "none";
            var input =  document.getElementsByClassName("task_input");
            for(var i=0; i< input.length; i++){
                input[i].value = "";
            }
            loadTasks();
          }
          else{
              alert("SQL error")
          }
      })//End of axios       
  }

  //Form delete task
  const DeleteForm=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
        key : document.getElementById("delete_modal_key").value,
    }
    axios.post(localStorage.getItem("url_hosting")+'Delete_Task.php',sendData)
    .then((result)=>{
        if(result.data.status === "Success"){
          handleClick(TransitionLeft);
          document.getElementById("delete_task_modal_container").style.display = "none";
          loadTasks();
        }
        else{
          alert("SQL error")
        }
    })    
  }

  //Form edit task
  const editForm=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
      key : document.getElementById("edit_task_key").value,
      title: document.getElementById("edit_task_title_input").value,
      description: document.getElementById("edit_task_description_input").value,
      date: document.getElementById("edit_task_date_input").value,
      time: document.getElementById("edit_task_time_input").value
    }
    axios.post(localStorage.getItem("url_hosting")+'Edit_Of_Task.php',sendData)
    .then((result)=>{
      if(result.data.status === "Success"){
        handleClick(TransitionLeft);
        document.getElementById("edit_task_modal_container").style.display = "none";
        loadTasks();
      }
      else{
        alert("SQL error")
      }
      })    
   }
  
  //Go to specific task
  function Go_to_specific_task_date(date_key, box_id){
    setting_css_in_date_task();
    document.getElementById(box_id).className = "box_active"
    window.localStorage.setItem('taskDateValue', date_key);
    loadTasks();
  }
    
  //Snack bar after add task
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //View all task container
  function view_all_task(){
    document.getElementById("view_alltask_modal_container").style.display = "flex";
    setTimeout(function () {
      document.getElementsByClassName("see_all_task_container")[0].style.bottom = "0";
    }, 10);
  }
  //Close all task container
  function close_all_task(){
    document.getElementById("searh_task").value = "";
    search_Task();
    document.getElementsByClassName("see_all_task_container")[0].style.bottom = "-100%";
    setTimeout(function () {
        document.getElementById("view_alltask_modal_container").style.display = "none";
    }, 400);
  }

//Filter Search
function search_Task(){
  var value = document.getElementById("searh_task").value;
  value = value.toLowerCase();
  $("#see_all_task_container .task_box_container").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
    
  if($('#see_all_task_container .task_box_container:visible').length === 0) {//if not found
      document.getElementsByClassName("no_task_available2")[0].style.display = "flex";
  }
  else if($('#see_all_task_container .task_box_container:visible').length !== 0){//if found
      document.getElementsByClassName("no_task_available2")[0].style.display = "none";
  }
  if(document.getElementById("searh_task").value.length === 0){
    document.getElementsByClassName("no_task_available2")[0].style.display = "none";
  }
}
    

    return(
    <div className="middle">

        <div className="top">
          <div className="left">
              <p>Task Scheduler</p>
              <p>{moment().format('LL')}</p>
          </div>
          <div className="right">
              <div className="add_task_btn" id="add_task_btn" onClick={show_add_task_modal}>+ Add Task</div>
              <MoreVertIcon 
                 fontSize="large" 
                 id="view_all_task_btn"
                 onClick={handleClick1}
                 size="small"
                 sx={{color:"white",marginRight:"-12px"}}
                 aria-controls={open1 ? 'account-menu1' : undefined}
                 aria-haspopup="true"
                 aria-expanded={open1 ? 'true' : undefined}
                />
              <Menu
                anchorEl={anchorEl1}
                id="account-menu1"
                open={open1}
                onClose={handleClose1}
                onClick={handleClose1}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem style={{display:"none"}}></MenuItem>
                <MenuItem onClick={view_all_task}>
                    <ListItemIcon>
                        <TaskIcon fontSize="medium"/>
                    </ListItemIcon>
                    View all task &nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="semitop">
           <div className="box" id="box_active1" onClick={() => { Go_to_specific_task_date(date1,"box_active1");}}>
              <p>{initialday[0]}</p>
              <p>{today_array[0]}</p>
           </div>
           <div className="box" id="box_active2" onClick={() => { Go_to_specific_task_date(date2,"box_active2");}}>
              <p>{initialday[1]}</p>
              <p>{today_array[1]}</p>
           </div>
           <div className="box" id="box_active3" onClick={() => { Go_to_specific_task_date(date3,"box_active3");}}>
             <p>{initialday[2]}</p>
             <p>{today_array[2]}</p>
           </div>
           <div className="box box_active" id="box_active4" onClick={() => { Go_to_specific_task_date(date4,"box_active4");}}>
             <p>{initialday[3]}</p>
             <p>{today_array[3]}</p>
           </div>
           <div className="box" id="box_active5" onClick={() => { Go_to_specific_task_date(date5,"box_active5");}}>
             <p>{initialday[4]}</p>
             <p>{today_array[4]}</p>
           </div>
           <div className="box" id="box_active6" onClick={() => { Go_to_specific_task_date(date6,"box_active6");}}>
             <p>{initialday[5]}</p>
             <p>{today_array[5]}</p>
           </div>
           <div className="box" id="box_active7" onClick={() => { Go_to_specific_task_date(date7,"box_active7");}}>
             <p>{initialday[6]}</p>
             <p>{today_array[6]}</p>
           </div>
        </div>

        <div className="bottom">
          {key_task_ctr_Am !== 0 ? 
          Task_box_Am : ""}   

          {key_task_ctr_Pm !== 0 ? 
          Task_box_Pm : ""}   

          {key_task_ctr_Am === 0 &&  key_task_ctr_Pm === 0 ? 
          <div className='no_task_available'>
            <img src={No_Records_Available} alt=""/>
            <p>No tasks available</p>
          </div> : ""}
        </div>
        
        <div style={{width:"100%",minHeight:"10px"}}></div>

        {/*Add Tasks Modal*/}
        <Add_Task_Modal
          Form_Submit = {submitForm}
        />

        {/*Edit Tasks Modal*/}
        <Edit_Task_Modal
          formAction = {editForm}
        />
          
        {/*View Tasks Modal*/}
        <ViewTaskModal/>

        {/* Add tasks complete snackbar*/}
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  TransitionComponent={transition}  key={transition ? transition.name : ''}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Action was process succesfully!
            </Alert>
          </Snackbar>
        </Stack>

        {/*Delete task container */}
        <Delete_Modal
          title = "Delete this task?"
          description = "If you delete this task it will be gone forever. Are you sure you want to proceed?"
          formAction = {DeleteForm}
        />

        {/*SEE ALL TASK CONTAINER*/}
        <div className="modal_container view_alltask_modal_container" id="view_alltask_modal_container">
          <div className="see_all_task_container">
            <div className="top">
              <p className="header">Your List of Tasks</p>
              <div className='close_btn'><span title="Close" onClick={close_all_task}>&#187;</span></div>
            </div>
            {key_task_ctr_All !== 0 ?
            <div className='search_container'>
                <div className='search_input_container'>
                    <div className='left'><img src={SearchIcon}/></div>
                    <input type="text" placeholder='Search here...' id="searh_task" onChange={search_Task}/> 
                </div> 
            </div>
            :   
            <input type="hidden" placeholder='Search here...' id="searh_task"/> }
            <div className="content">
              <ul className="ul_task" id="ul_task">
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  id="see_all_task_container"
                >   
                  {key_task_ctr_All === 0 ?
                    <div className='no_task_available no_task_available1' style={{height:"50vh"}}>
                      <img src={No_Records_Available} alt="" style={{height:"100px"}}/>
                      <p style={{fontSize:"1.3rem"}}>No tasks available</p>
                    </div>  :   Task_box_All
                  } 

                      <div className='no_task_available no_task_available2' style={{height:"50vh",display:"none"}}>
                        <img src={No_Records_Available} alt=""/>
                        <p>No tasks available</p>
                      </div>
                </Grid>     
              </ul>
            </div>  

          </div>
        </div>

    </div>
    )
}

  



//Setting of date choose in task
var dateA = new Date();
var date1 = dateA.setDate(dateA.getDate() - 3);
date1 = moment(dateA).format().slice(0, 10);
var dateB = new Date();
var date2 = dateB.setDate(dateB.getDate() - 2);
date2 = moment(dateB).format().slice(0, 10);
var dateC = new Date();
var date3 = dateC.setDate(dateC.getDate() - 1);
date3 = moment(dateC).format().slice(0, 10);
var dateD = new Date();
var date4 = dateD.setDate(dateD.getDate());
date4 = moment(dateD).format().slice(0, 10);
var dateE = new Date();
var date5 = dateE.setDate(dateE.getDate() + 1);
date5 = moment(dateE).format().slice(0, 10);
var dateF = new Date();
var date6 = dateF.setDate(dateF.getDate() + 2);
date6 = moment(dateF).format().slice(0, 10);
var dateG = new Date();
var date7 = dateG.setDate(dateG.getDate() + 3);
date7 = moment(dateG).format().slice(0, 10);
  
function setting_css_in_date_task(){
  document.getElementById("box_active1").classList.remove("box_active");
  document.getElementById("box_active2").classList.remove("box_active");
  document.getElementById("box_active3").classList.remove("box_active");
  document.getElementById("box_active4").classList.remove("box_active");
  document.getElementById("box_active5").classList.remove("box_active");
  document.getElementById("box_active6").classList.remove("box_active");
  document.getElementById("box_active7").classList.remove("box_active");

  document.getElementById("box_active1").className = "box_active_date";
  document.getElementById("box_active2").className = "box_active_date";
  document.getElementById("box_active3").className = "box_active_date";
  document.getElementById("box_active4").className = "box_active_date";
  document.getElementById("box_active5").className = "box_active_date";
  document.getElementById("box_active6").className = "box_active_date";
  document.getElementById("box_active7").className = "box_active_date";
}