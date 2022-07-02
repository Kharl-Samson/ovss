import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Vaccine.css";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

import Search_Icon from "./Images/Search_Icon.png";
import Mic_Icon from "./Images/Mic_Icon.png";
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Report_Icon from "./Images/Report_Icon.png";
import No_Records_Available from "./Images/No_Records_Available.png";
import Admin_Left_Navigation_Bar from '../Navigation_Bar/Left_Nav';
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import $ from 'jquery'; 

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import EachVaccine from './EachVaccine';
import speechRecog from "./Images/speechRecog.gif";
import ViewVaccine from './ViewVaccine';
import EditVaccine from './EditVaccine';
import SuccesSlideModal from '../../Modals/SuccesSlideModal';

export default function Admin_Vaccine_Page(){


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
  document.title = "OVSS | Vaccine Management";
  
  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_vaccine_report").style.pointerEvents="none";
    document.getElementById("admin_Vaccine_Management_link").style.backgroundColor = "#e7e7ff";
    document.getElementById("left_nav_Vaccine_Management_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("left_nav_vaccine_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_vax_link").style.backgroundColor = "#e7e7ff";
  }, 10);
  

  //Hook for view the list of vaccines
  const [vaccines, setVaccines] = useState([]);  
  const loadVaccines = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Vaccines.php");
    setVaccines(result.data.phpresult);
  };
  useEffect(() => {
    loadVaccines();
  }, []);
 

  var array_vaccines_ctr = 0;
  const box_vaccines = vaccines.map((res) => {
    array_vaccines_ctr++;
    return (
      <EachVaccine
        key = {array_vaccines_ctr}
        id = {res.id}
        name = {res.name}
        abbreviation = {res.abbreviation}
        description = {res.description}
        prevented = {res.prevented}
        age = {res.age}
        dose_no = {res.dose_no}
        days_interval = {res.days_interval}
        image = {res.image}
      />
    ); 
  });


//Filter Search
function search_Vaccine(){
  var value = document.getElementById("search_vaccine").value;
  value = value.toLowerCase();
  $("#grid_vaccine .vaccine_cotainer").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
  if($('#grid_vaccine .vaccine_cotainer:visible').length === 0) {//if not found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "flex";
  }
  else if($('#grid_vaccine .vaccine_cotainer:visible').length !== 0){//if found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
  if(document.getElementById("search_vaccine").value.length === 0){
    document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
}

//Voice search
function record() {
  var recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-GB";
  document.getElementsByClassName("speech_Modal")[0].style.display="flex";
  document.getElementById("speak_text").textContent = "Speak now"
  setTimeout(function () {
    document.getElementById("speak_text").style.marginRight="40px";
  }, 300);
  recognition.onresult = function(event) {

    if (event.results[0][0].transcript.indexOf('.') !== -1) {
      document.getElementById('search_vaccine').value = event.results[0][0].transcript.slice(0, -1);
      document.getElementById("speak_text").textContent = event.results[0][0].transcript.slice(0, -1);
    } else {
      document.getElementById('search_vaccine').value = event.results[0][0].transcript;
      document.getElementById("speak_text").textContent = event.results[0][0].transcript;
    }
    search_Vaccine();
    setTimeout(function () {
      document.getElementsByClassName("speech_Modal")[0].style.display="none";
      document.getElementById("speak_text").style.marginRight="140px";
    }, 500);
  }
    recognition.start();
  }
  function close_speechModal(){
      document.getElementsByClassName("speech_Modal")[0].style.display="none";
  } 


  //Edit vaccine form 
  const editForm=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      id: document.getElementById("edit_vax_id").value,
      name: document.getElementById("edit_vax_name").value,
      abbreviation: document.getElementById("edit_vax_abbreviation").value,
      description: document.getElementById("edit_vax_descripiton").value,
      prevented: document.getElementById("edit_vax_disease").value,
      age: document.getElementById("edit_vax_age").value,
      dose_no: document.getElementById("edit_vax_dosage").value,
      days_interval: document.getElementById("edit_vax_days").value,
      image: document.getElementById("image_input").value,
    }
    axios.post(localStorage.getItem("url_hosting")+"Edit_Vaccine.php",sendData).then((result)=>{
      if(result.data.status === "Success"){
          loadVaccines();
          setTimeout(function () {
            document.getElementById("edit_vaccine_container").style.display = "none";
          }, 400);
          document.getElementById("edit_container").style.marginRight = "-100%";
          document.getElementById("slide_modal_container").style.left = "75px";
          setTimeout(function () {
            document.getElementById("slide_modal_container").style.left = "-100%";
          }, 2000);
      }
    })//End of axios
    for (let i = 0; i < document.getElementsByName("img_vaccine[]").length; i++) {
      data.append("file[]", document.getElementsByName("img_vaccine[]")[i].files[0]);
    }
    let url = localStorage.getItem("url_hosting")+"Edit_Vaccine.php";
    axios.post(url, data, {}).then((res) => {});
  }

return(
  <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Manage <span style={{color:"#4D77FF"}}>Vaccines</span></h1>

          <div className="schedule_top">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className="left">
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                > 
                  <div className="search_container">
                    <div className="icon">
                      <img alt="" src={Search_Icon}/>
                    </div>
                    <input type="text" placeholder="Search here" id="search_vaccine" onKeyUp={search_Vaccine}/>
                    <div className="icon">
                      <LightTooltip title="Search by voice">
                        <img alt="" src={Mic_Icon} onClick={record} id="voice_search_icon"/>
                      </LightTooltip>
                    </div>
                  </div>    
                </Grid>
              </div>

              <div className="right">
                <LightTooltip title="Export into PDF file">
                <div className="search_container" style={{width:"auto"}}>
                  <div className="icon" style={{borderRight:"1.5px solid rgb(150, 150, 150)"}}>
                    <img alt="" src={Report_Icon}/>
                  </div>
                  <span>Generate Report</span>
                </div>
                </LightTooltip>
              </div>
            </Grid>
          </div>

          <div className="all_vaccine_container">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              id="grid_vaccine"
            >
                {vaccines.length === 0 ?
                  <div className='no_schedule_available no_schedule_available1'>
                    <img src={No_Records_Available} alt=""/>
                    <p style={{fontSize:"1.3rem"}}>No vaccine available</p>
                  </div>
                :
                  box_vaccines
                }

                    <div div className='no_schedule_available no_schedule_available2' style={{display:"none"}}>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No vaccine found</p>
                    </div>
            </Grid>
          </div>

        </div>
      </div>
      <Admin_Right_Navigation_Bar/>
    </div>


      {/*MODAL FOR SPEECH RECOGNITION */}
      <div className="speech_Modal">
        <LightTooltip title="Close">
          <p className="close_speech" onClick={close_speechModal}>&#215;</p>
        </LightTooltip> 
        <p id="speak_text">Speak now</p>
        <img src={speechRecog}/> 
      </div>

       {/*MODAL FOR VIEW VACCINE */}
       <ViewVaccine/>

      {/*MODAL FOR EDIT VACCINE */}
      <EditVaccine
        formAction = {editForm}
      />

      {/*Success slide modal*/}
      <SuccesSlideModal/>

  </div>
)
}

