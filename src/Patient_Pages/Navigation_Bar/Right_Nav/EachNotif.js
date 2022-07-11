import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';

export default function EachNotif(props){
    
return(
<div className="box">
    <div className="left">
        <div className="icon"><CalendarMonthIcon fontSize="large"/></div>
    </div>
    <div className="right">
       <p><b>{props.motherFname+" "+props.motherLname}</b> has a pending appointment on {moment(props.appointmentDate).format('LL')}.</p>
       <p>{moment(props.appoint_created, "YYYY-MM-DD").fromNow()}</p>
    </div>
</div>
)
}