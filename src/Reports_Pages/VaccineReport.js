import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./report.css";
import baliuag_logo from "./Images/baliuag_logo.png";
import bulacan_logo from "./Images/bulacan_logo.png";

export default function Vaccine_Report(){

  //Hook for view the list of task of user
  const [appointments, setAppoointments] = useState([]);  
  const loadAppointment = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Vaccines.php");
    setAppoointments(result.data.phpresult);
  };
  useEffect(() => {
      loadAppointment();
   }, []);
 

  var array_pending_schedule_ctr = 0;
  const box_pending_schedule = appointments.map((res) => {
      array_pending_schedule_ctr++;
      return (
        <tr key={array_pending_schedule_ctr}>
          <td>{res.name}</td>
          <td>{res.prevented}</td>
          <td>{res.description}</td>
          <td>{res.dose_no}</td>
        </tr>
      ); 
  });


return(
<div className="report_container" id="vaccine_report_container">
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

    <p className="subtitle_report" style={{textTransform:"uppercase"}}>LIST OF VACCINES</p>

    <table>
        <tr>
          <th>VACCINE NAME</th>
          <th>DISEASES TO BE PREVENTED</th>
          <th>DESCRIPTION</th>
          <th>DOSE REQUIRED</th>
        </tr>

        {box_pending_schedule}
    </table>
</div>
)
}