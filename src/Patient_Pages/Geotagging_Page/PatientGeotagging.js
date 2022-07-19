import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Geotagging.css";
import CircularProgress from '@mui/material/CircularProgress';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Patient_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Patient_Right_Navigation_Bar from "../Navigation_Bar/Right_Nav";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import location_icon from "./Images/location_icon.png";
import pinagpala from "./Images/pinagpala.png";
import masagana from "./Images/masagana.png";
import bagongSilang from "./Images/bagongSilang.png";

export default function PatientGeotagging(){

    //Tooltip
    const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }}/>
      ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: ".8rem",
      },
    }));   

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Geotagging";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_geotagging").style.pointerEvents="none";
    document.getElementById("left_nav_geotagging_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_geotagging_link").style.backgroundColor = "#e7e7ff";
  }, 10);


//If the width of screen is below 850px -> It will hide the profile notifyer
const mq = window.matchMedia("(max-width: 850px)");
if (mq.matches) {}
else{
    setTimeout(function(){
        if(localStorage.getItem('patient_account_status') !=="Pending"){
            document.getElementById("profile_notify_container").style.display="none"
        }
        else{
            document.getElementById("profile_notify_container").style.display="flex";
        }
    },1000);
}


  //Loading while fetching data in axios
  const [loading,setLoading] = useState(false);
   //Hook for view the list of task of user
   const [appointments, setAppoointments] = useState([]);  
   const loadAppointment = async () =>{
       const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Appointments.php");
       setLoading(true);
       setAppoointments(result.data.phpresult);
   };
   useEffect(() => {
      loadAppointment();
   }, []);
 

 
   function setPurok(){
    var purok_ctr = 0;
    if(document.getElementById("purok_val").value === "Masagana"){
        appointments.map((res) => {
            if(res.child_vaccineDose === "1" && res.purok === "Masagana" && res.appointment_status === "Done"){
               purok_ctr++; 
            }
          });         
    }
    else if(document.getElementById("purok_val").value === "Bagong Silang"){
        appointments.map((res) => {
            if(res.child_vaccineDose === "1" && res.purok === "Bagong Silang" && res.appointment_status === "Done"){
               purok_ctr++; 
            }
        });         
    }
    else if(document.getElementById("purok_val").value === "Pinagpala"){
        appointments.map((res) => {
            if(res.child_vaccineDose === "1" && res.purok === "Pinagpala" && res.appointment_status === "Done"){
               purok_ctr++; 
            }
        });         
    }
    document.getElementById("vax_val").selectedIndex = 0;
    document.getElementsByClassName("vax_total")[0].textContent = purok_ctr;
   }

   function setVaccine(){
    var array_history_schedule_ctr = 0;
        appointments.map((res) => {
            if(res.child_vaccineDose === "1" && res.purok === document.getElementById("purok_val").value && res.child_vaccineName === document.getElementById("vax_val").value && res.appointment_status === "Done"){
               array_history_schedule_ctr++; 
            }
          });         
    document.getElementsByClassName("vax_total")[0].textContent = array_history_schedule_ctr;
   }

   function setPinagpala(){
    document.getElementById("purok_val").selectedIndex = 3;
    setPurok();
   }
   function setMasagana(){
    document.getElementById("purok_val").selectedIndex = 2;
    setPurok();
   }
   function setBagongSilang(){
    document.getElementById("purok_val").selectedIndex = 1;
    setPurok();
   }
            
return(
<div className="admin_dashboard_container">
    <Patient_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">
 
            <h1>Geotagging</h1>
                
            <div className="map_container">
                 <div className='pinagpala_container'
                    style={{
                      backgroundImage: `url(${pinagpala})`
                    }}
                 >             
                     <LightTooltip title="Pinagpala"><img src={location_icon} alt="" onClick={setPinagpala}/></LightTooltip>
                 </div>

                 <div className='right'>
                    <div className='masagana_container'
                       style={{
                        backgroundImage: `url(${masagana})`
                       }}
                    >    
                       <LightTooltip title="Masagana"><img src={location_icon} alt="" onClick={setMasagana}/></LightTooltip>
                    </div>
                    <div className='bagongSilang_container'
                       style={{
                        backgroundImage: `url(${bagongSilang})`
                       }}
                    >
                       <LightTooltip title="Bagong Silang"><img src={location_icon} alt="" onClick={setBagongSilang}/></LightTooltip>
                    </div>
                 </div>
            </div>

            <div className='data_container'>
            {loading ?
                <div>
                  <div className='top'>
                    <p>Pinagbarilan</p>
                    <p>BALIUAG, BULACAN, PH</p>
                  </div>
    
                  <select onChange={setPurok} id="purok_val">
                      <option disabled selected value="">-Select Purok-</option>
                      {purok_object &&
                        purok_object.length > 0 &&
                        purok_object.map((item) =>
                          <option key={item.label} value={item.label}>
                              {item.label}
                          </option>
                      )}
                  </select>
    
                  <select onChange={setVaccine} id="vax_val">
                      <option disabled selected value="">-Select Vaccines-</option>
                      {vaccines_object &&
                        vaccines_object.length > 0 &&
                        vaccines_object.map((item) =>
                          <option key={item.label} value={item.label}>
                              {item.label}
                          </option>
                      )}
                    </select>
                    <p className='vax_patient'>Vaccinated Patients</p>     
                    <p className='vax_total'>0</p>
                </div>
                :
                <CircularProgress style={{height:"40px",width:"40px"}}/>
              }
            </div>   
             
            </div>
        </div>
            
        <Patient_Right_Navigation_Bar/>
    </div>

</div>
)
}

//List of purok
const purok_object = [
    { label: "Bagong Silang" },
    { label: "Masagana" },
    { label: "Pinagpala" }, 
];

const vaccines_object = [
    { label: "Oral Polio" },
    { label: "Pentavelent" },
    { label: "Hepatitis B" }, 
    { label: "Inactivated Polio" },
    { label: "Measeles, Mumps, Rubella" },
    { label: "BCG" }, 
    { label: "Pneumococcal Conjugative" }, 
];