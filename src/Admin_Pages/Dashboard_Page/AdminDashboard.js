import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./dashboard.css"

import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Image_Banner from "../../Assets/Dashboard_Page/Image_Banner.png";
import Vaccinated_Person_Icon from "../../Assets/Dashboard_Page/Vaccinated_Person_Icon.png";
import Registered_User_Icon from "../../Assets/Dashboard_Page/Registered_User_Icon.png";
import Left_statistics_bg from "../../Assets/Dashboard_Page/Left_statistics_bg.png";
import CircularProgress from '@mui/material/CircularProgress';
//Chart Js
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
//Data that I fetch in react chart
import { VaccineData } from "./Data";
import Admin_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from "../Navigation_Bar/Right_Nav";

export default function AdminDashboard_Page(){

    //Loading the logo and the title on the Tab of the browser
    document.querySelector("link[rel='shortcut icon']").href = TabLogo;
    document.title = "OVSS | Dashboard";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_dashboard").style.pointerEvents="none";
    document.getElementById("left_nav_dashboard_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_dashboard_link").style.backgroundColor = "#e7e7ff";
  }, 10);


  //Chart settings
  const myArray = [];
  myArray.push(localStorage.getItem("oralPolio_count"),localStorage.getItem("Pentavelent_count"),localStorage.getItem("Hepatitis_B_count"),localStorage.getItem("Inactivated_Polio"),localStorage.getItem("mmr_count"),localStorage.getItem("BCG_count"),localStorage.getItem("Pneumococcal_count"))
  const [userData, setUserData] = useState({
    labels: VaccineData.map((res) => res.vaccineName),
    datasets: [
      {
        label: "Total number of Vaccinated",
        data: myArray,
        backgroundColor: [
          "#336CFB","#FAC032","#51cda0","#df7970","#df874d","#c39762","#4c9ca0",
          "#336CFB","#FAC032","#51cda0","#df7970","#df874d","#c39762","#4c9ca0",
          "#336CFB","#FAC032","#51cda0","#df7970","#df874d","#c39762","#4c9ca0",
          "#336CFB","#FAC032","#51cda0","#df7970","#df874d","#c39762","#4c9ca0",
          "#336CFB","#FAC032","#51cda0","#df7970","#df874d","#c39762","#4c9ca0",
          "#336CFB","#FAC032","#51cda0","#df7970","#df874d","#c39762","#4c9ca0",
        ],
      },
    ],
  });


const [appointments, setAppoointments] = useState([]);  
const [patients, setPatients] = useState([]);  
const loadAppointment = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Appointments.php");
    setAppoointments(result.data.phpresult);
};
const loadPatients = async () =>{
  const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Patients.php");
  setPatients(result.data.phpresult);
};
useEffect(() => {
   loadAppointment();
   loadPatients();
}, []);

var vaxPatient_count = 0;
appointments.map((res) => {
  if(res.child_vaccineDose === "1" && res.appointment_status === "Done"){
    vaxPatient_count++; 
  }
});  

var Patient_count = 0;
patients.map((res) => {
    Patient_count++; 
});  

return(
<div className="admin_dashboard_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">

                <h1>Hello, <span style={{color:"#4D77FF"}}>{localStorage.getItem("admin_login_firstname")}</span></h1>

                <div
                  className="image_banner"
                  style={{
                      backgroundImage: `url(${Image_Banner})`
                  }}
                >
                  <h1>Pinagbarilan, Baliuag</h1>
                  <p>Bulacan, PH</p>
                </div>

                <div className="box_stats">
          
                  <div className="container"
                    style={{
                      backgroundImage: `url(${Left_statistics_bg})`
                    }}
                  >
                    <div className="right">
                        <p>Vaccinated Patients</p>
                        <p>{vaxPatient_count}</p>
                    </div>
                    <div className="left"><img alt="" src={Vaccinated_Person_Icon}/></div>
                  </div>


                  <div className="container">
                    <div className="right">
                        <p>Registered Users</p>
                        <p style={{color:"#336CFB"}}>{Patient_count}</p>
                    </div>
                    <div className="left"><img alt="" src={Registered_User_Icon}/></div>
                  </div>

                </div>  
                
                <h1 className="header_text_statistics">Statistics</h1>
                <div className="statistics">
                  <Bar data={userData} height={130}/>
                </div>
            </div>
        </div>
            
        <Admin_Right_Navigation_Bar/>
    </div>
</div>
)
}