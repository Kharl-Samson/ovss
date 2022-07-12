import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';

export default function EachNotif(props){
    
return(
<div className="box box_notifications">
    <div className="left">
        <div className="icon"><CalendarMonthIcon fontSize="large"/></div>
    </div>
    <div className="right">
       <p><b>{props.motherFname+" "+props.motherLname}</b> has a pending appointment on {moment(props.appointmentDate).format('LL')}.</p>
       <p>{moment(props.appoint_created, "YYYY-MM-DD").fromNow()}</p>

       <div className="btn">   
          <form style={{height:"100%",width:"47%"}} onSubmit={props.formAccept}>
          <input type="hidden" id="notif_id" value={props.id}/>
          <input type="hidden" id="notif_email" value={props.email}/>
          <input type="hidden" id="notif_name" value={props.motherFname+" "+props.motherLname}/>
          <input type="hidden" id="notif_date" value={props.appointmentDate}/>
          <button type="submit" id="btn1">       
            <center>
               <CircularProgress color="inherit" id="progress_btn_schedule_modal" className="progress_btn_accept_notif"/>
            </center>      
            <span className="text_btn_accept_notif">Accept</span>
          </button>
          </form>

          <form style={{height:"100%",width:"47%"}} onSubmit={props.formReject}>
          <input type="hidden" id="notif_id1" value={props.id}/>
          <input type="hidden" id="notif_email1" value={props.email}/>
          <input type="hidden" id="notif_name1" value={props.motherFname+" "+props.motherLname}/>
          <input type="hidden" id="notif_date1" value={props.appointmentDate}/>
          <button type="submit" id="btn2">
            <center>
               <CircularProgress color="inherit" id="progress_btn_schedule_modal" className="progress_btn_reject_notif"/>
            </center>      
            <span className="text_btn_reject_notif">Reject</span>
          </button>
          </form>

       </div>
    </div>
</div>
)
}