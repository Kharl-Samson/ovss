import React from "react";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Add_Task_Modal from "./TaskScheduler/AddTask";

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
     
   //Showing add task modal
   function show_add_task_modal(){
    document.getElementById("add_task_modal_container").style.display = "flex";
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
                 title="Your profile" 
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
                <MenuItem>
                    <ListItemIcon>
                        <TaskIcon fontSize="medium"/>
                    </ListItemIcon>
                    View all task &nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="semitop">
           <div className="box">
              <p>{initialday[0]}</p>
              <p>{today_array[0]}</p>
           </div>
           <div className="box">
              <p>{initialday[1]}</p>
              <p>{today_array[1]}</p>
           </div>
           <div className="box">
             <p>{initialday[2]}</p>
             <p>{today_array[2]}</p>
           </div>
           <div className="box box_active">
             <p>{initialday[3]}</p>
             <p>{today_array[3]}</p>
           </div>
           <div className="box">
             <p>{initialday[4]}</p>
             <p>{today_array[4]}</p>
           </div>
           <div className="box">
             <p>{initialday[5]}</p>
             <p>{today_array[5]}</p>
           </div>
           <div className="box">
             <p>{initialday[6]}</p>
             <p>{today_array[6]}</p>
           </div>
        </div>

        <div className="bottom">

          <div className="box">
              <div className="left">
                 <AssignmentIcon id="task_icon"/>
                 <p>12:00</p>
                 <p>am</p>
              </div>
              <div className="right">
                 <p>Adding of vaccine stocks</p>
              </div>
          </div>   

          <div className="box">
              <div className="left">
                 <AssignmentIcon id="task_icon"/>
                 <p>12:00</p>
                 <p>am</p>
              </div>
              <div className="right">
                 <p>Adding of vaccine stocks</p>
              </div>
          </div>   

          <div className="box">
              <div className="left">
                 <AssignmentIcon id="task_icon"/>
                 <p>12:00</p>
                 <p>am</p>
              </div>
              <div className="right">
                 <p>Adding of vaccine stocks</p>
              </div>
          </div>   
          
          <div className="box">
              <div className="left">
                 <AssignmentIcon id="task_icon"/>
                 <p>12:00</p>
                 <p>am</p>
              </div>
              <div className="right">
                 <p>Adding of vaccine stocks</p>
              </div>
          </div>   

        </div>
        
        <div style={{width:"100%",minHeight:"10px"}}></div>

        {/* Tasks Modals*/}
        <Add_Task_Modal/>
    </div>
    )
}

  