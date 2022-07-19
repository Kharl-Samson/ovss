import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./report.css";
import baliuag_logo from "./Images/baliuag_logo.png";
import bulacan_logo from "./Images/bulacan_logo.png";

export default function Patient_Report(){

  //Hook for view the list of task of user
  const [appointments, setAppoointments] = useState([]);  
  const loadAppointment = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Patients.php");
    setAppoointments(result.data.phpresult);
  };
  useEffect(() => {
      loadAppointment();
   }, []);
 

  var array_pending_schedule_ctr = 0;
  const box_pending_schedule = appointments.map((res) => {
      array_pending_schedule_ctr++;
      var fnameStr = res.child_fname
      var lnameStr = res.child_lname
      const myArrayfname = fnameStr.split(" || ");
      const myArraylname = lnameStr.split(" || ");
      const newArrayname = [];
      for(var i = 0 ; i< myArrayfname.length-1; i++){
        newArrayname.push(myArrayfname[i]+" "+myArraylname[i]+", ")
      }
      return (
        <tr key={array_pending_schedule_ctr}>
          <td>{"OVSS-"+res.id}</td>
          <td>{res.fname+" "+res.lname}</td>
          <td>{res.contact}</td>
          <td>{newArrayname}</td>
          <td>{res.purok}</td>
        </tr>
      ); 
  });


return(
<div className="report_container" id="patient_report_container">
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

    <p className="subtitle_report" style={{textTransform:"uppercase"}}>LIST OF PATIENTS</p>

    <table>
        <tr>
          <th style={{width:"20%"}}>MOTHER ID</th>
          <th style={{width:"20%"}}>MOTHERS NAME</th>
          <th style={{width:"20%"}}>CONTACT</th>
          <th style={{width:"20%"}}>LIST OF CHILD</th>
          <th style={{width:"20%"}}>PUROK</th>

        </tr>

        {box_pending_schedule}
    </table>
</div>
)
}