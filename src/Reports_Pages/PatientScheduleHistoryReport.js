import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./report.css";
import baliuag_logo from "./Images/baliuag_logo.png";
import bulacan_logo from "./Images/bulacan_logo.png";

export default function Patient_Schedule_History_Report(){

  //Hook for view the list of task of user
  const [appointments, setAppoointments] = useState([]);  
  const loadAppointment = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Appointments.php");
    setAppoointments(result.data.phpresult);
  };
  useEffect(() => {
      loadAppointment();
   }, []);
 

  var array_pending_schedule_ctr = 0;
  const box_pending_schedule = appointments.map((res) => {
    if(res.email === localStorage.getItem("patient_login_email")){
      array_pending_schedule_ctr++;
      return (
        <tr key={array_pending_schedule_ctr}>
          <td>{res.appointment_date}</td>
          <td>{res.mother_fname+" "+res.mother_lname}</td>
          <td>{res.contact}</td>
          <td>{res.child_fname+" "+res.child_lname}</td>
          <td>{res.child_vaccineName}</td>
          <td>{res.appointment_status}</td>
        </tr>
      ); 
  }
  });


return(
<div className="report_container" id="patient_history_report_container">
    <div className="header">
        <img alt="" src={baliuag_logo}/>
        <div className="center_header">
          <p>Republic of the Philippines</p>
          <p>Municipality of Baliwag</p>
          <p>Province of Bulacan</p>
          <p>Barangay Pinagbarilan</p>
        </div>
        <img alt="" src={bulacan_logo} style={{visibility:"hidden"}}/>
    </div>

    <div className="line_top"></div>

    <p className="title_report">ONLINE VACCINATION SCHEDULING SYSTEM</p>

    <p className="subtitle_report" style={{textTransform:"uppercase"}}>HISTORY SCHEDULE</p>

    <table>
        <tr>
          <th>DATE RECEIVED</th>
          <th>MOTHERS NAME</th>
          <th>CONTACT</th>
          <th>CHILD NAME</th>
          <th>VACCINE NAME</th>
          <th>STATUS</th>
        </tr>

        {box_pending_schedule}
    </table>
</div>
)
}