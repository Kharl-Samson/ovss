import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";

export default function EachNotif(props){
    
return(
<div className="box">
    <div className="left">
        <div className="icon"><CalendarMonthIcon fontSize="large"/></div>
    </div>
    <div className="right">
       <p>Your appointment status on <b>{moment(props.appointmentDate).format('LL')}</b> was changed by the admin into  <b style={{textTransform:"lowercase"}}>{props.appoint_Status}</b>.</p>
       <p>{moment(props.appoint_created, "YYYY-MM-DD").fromNow()}</p>
    </div>
</div>
)
}