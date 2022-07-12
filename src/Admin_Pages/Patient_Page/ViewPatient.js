import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Patient.css";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

import No_Records_Available from "./Images/No_Records_Available.png";
import Search_Icon from "./Images/Search_Icon.png";
import Mic_Icon from "./Images/Mic_Icon.png";
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Report_Icon from "./Images/Report_Icon.png";
import Calendar_Icon from "./Images/Calendar_Icon.png";
import Admin_Left_Navigation_Bar from '../Navigation_Bar/Left_Nav';
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import CircularProgress from '@mui/material/CircularProgress';
import $ from 'jquery'; 
import moment from "moment";
import { addDays } from "date-fns";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import speechRecog from "./Images/speechRecog.gif";

import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import EachPatient_box from './EachPatient';
import EachRowPatient from './EachRowPatient';

export default function Admin_ViewPatient_Page(){

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
  document.title = "OVSS | Patient Records";
  
  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_view_patient").style.pointerEvents="none";
    document.getElementById("admin_View_Patient_link").style.backgroundColor = "#e7e7ff";
    document.getElementById("left_nav_View_Patient_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("left_nav_patient_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_patient_link").style.backgroundColor = "#e7e7ff";
  }, 10);
  

  //Loading while fetching data in axios
  const [loading,setLoading] = useState(false);
  //Hook for view the list of patients
  const [patients, setPatients] = useState([]);  
  const loadPatients = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Patients.php");
    setLoading(true);
    setPatients(result.data.phpresult);
  };
  useEffect(() => {
    loadPatients();
  }, []);

  
  var array_patient_ctr = 0;
  const box_patient = patients.map((res) => {
    if(res.status !== "Pending"){
    array_patient_ctr++;
    return (
      <EachPatient_box
        key = {array_patient_ctr}
        id = {res.id}
        email = {res.email}  
        fname = {res.fname}
        mname = {res.mname}
        lname = {res.lname}
        bday = {res.bday}
        age = {res.age}
        purok = {res.purok}
        barangay = {res.barangay}
        municipality = {res.municipality}
        province = {res.province}
        contact = {res.contact}
        profile_photo = {res.profile_photo}
        date_created = {res.date_created}
        child_fname = {res.child_fname}
        child_mname = {res.child_mname}
        child_lname = {res.child_lname}
        child_sex = {res.child_sex}
        child_weight = {res.child_weight}
        child_place = {res.child_place}
        child_bday = {res.child_bday}
        child_age = {res.child_age}
      />
    ); 
   }
  });
  var array_patient_ctr1 = 0;
  const each_patient = patients.map((res) => {
    if(res.status !== "Pending"){
    array_patient_ctr1++;
    return (
      <EachRowPatient
      key = {array_patient_ctr1}
      id = {res.id}
      email = {res.email}  
      fname = {res.fname}
      mname = {res.mname}
      lname = {res.lname}
      bday = {res.bday}
      age = {res.age}
      purok = {res.purok}
      barangay = {res.barangay}
      municipality = {res.municipality}
      province = {res.province}
      contact = {res.contact}
      profile_photo = {res.profile_photo}
      date_created = {res.date_created}
      child_fname = {res.child_fname}
      child_mname = {res.child_mname}
      child_lname = {res.child_lname}
      child_sex = {res.child_sex}
      child_weight = {res.child_weight}
      child_place = {res.child_place}
      child_bday = {res.child_bday}
      child_age = {res.child_age}
      />
    ); 
    }
  });


//Filter Search
function search_Patient(){
  var value = document.getElementById("search_patient").value;
  value = value.toLowerCase();
  $("#grid_patient .patient_container").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
  if($('#grid_patient .patient_container:visible').length === 0) {//if not found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "flex";
  }
  else if($('#grid_patient .patient_container:visible').length !== 0){//if found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }

  $("#header_body .row_patient_container").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
  if($('#header_body .row_patient_container:visible').length === 0) {//if not found
    document.getElementsByClassName("no_schedule_available3")[0].style.display = "flex";
  }
  else if($('#header_body .row_patient_container:visible').length !== 0){//if found
    document.getElementsByClassName("no_schedule_available3")[0].style.display = "none";
  }

  if(document.getElementById("search_patient").value.length === 0){
    document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
  if(document.getElementById("search_patient").value.length === 0){
    document.getElementsByClassName("no_schedule_available3")[0].style.display = "none";
  }

  
}

  //Filter dates
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  const [anchorEl_open1, setAnchorEl_open1] = React.useState(null);
  const openTEST1 = Boolean(anchorEl_open1);
  const handleClick1 = (event) => {
    setAnchorEl_open1(event.currentTarget);
    document.getElementById("basic-menu1").style.display = "flex";
  };

  //Close filter date by clicking its container
  const handleCloseEffect1 = () => {
    setAnchorEl_open1(null);
  };

  //Clear filter
  function clearFilter() {
    setAnchorEl_open1(null);
    setState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 0),
          key: "selection",
        },
      ]);
    document.getElementById("filter_date_value").value = "";
    document.getElementById("input_from").value = "";
    document.getElementById("input_to").value = "";

    var div = document.getElementsByClassName("patient_container");  
    var div1 = document.getElementsByClassName("row_patient_container");  
    for (var i = 0; i < div.length; i++) {
      div[i].style.display = "flex";
      div1[i].style.display = "flex";
    }
    document.getElementsByClassName("no_schedule_available2")[0].style.display ="none";
    document.getElementsByClassName("no_schedule_available3")[0].style.display = "none";
    document.getElementById("search_patient").value = "";
  }

  //Cancel filter
  function cancelFilter(){
    handleCloseEffect1();
  }

  //Clicking Apply Filter
  function ApplyFilter() {
    var fromArray = moment(state[0].startDate).format("L").split("/");
    var from = fromArray[2] + "-" + fromArray[0] + "-" + fromArray[1];
    var toArray = moment(state[0].endDate).format("L").split("/");
    var to = toArray[2] + "-" + toArray[0] + "-" + toArray[1];
    document.getElementById("filter_date_value").value = fromArray[1] + "/" + fromArray[0] + "/" + fromArray[2] + " - "+
     toArray[1] + "/" + toArray[0] + "/" + toArray[2];
    document.getElementById("input_from").value = from;
    document.getElementById("input_to").value = to;
    document.getElementById("search_patient").value = "";
    document.getElementById("basic-menu1").style.display = "none";
    var div = document.getElementsByClassName("patient_container");  
    var div1 = document.getElementsByClassName("row_patient_container");  
      if (document.getElementById("input_from").value !== "" && document.getElementById("input_to").value !== "") {
        for (var i = 0; i < div.length; i++) {
          var key = document.getElementsByClassName("date_created")[i].value;
          if (key) {
            if ( key >= document.getElementById("input_from").value && key <= document.getElementById("input_to").value) {
              div[i].style.display = "flex";
              div1[i].style.display = "flex";
            } else {
              div[i].style.display = "none";
              div1[i].style.display = "none";
            }
          }
          if ($("#grid_patient .patient_container:visible").length === 0) {
            document.getElementsByClassName("no_schedule_available2")[0].style.display ="flex";
          }
          else if ($("#grid_patient .patient_container:visible").length != 0) {
            document.getElementsByClassName("no_schedule_available2")[0].style.display ="none";
          }
          if($('#header_body .row_patient_container:visible').length === 0) {//if not found
            document.getElementsByClassName("no_schedule_available3")[0].style.display = "flex";
          }
          else if($('#header_body .row_patient_container:visible').length !== 0){//if found
            document.getElementsByClassName("no_schedule_available3")[0].style.display = "none";
          }        
        }
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
      document.getElementById('search_patient').value = event.results[0][0].transcript.slice(0, -1);
      document.getElementById("speak_text").textContent = event.results[0][0].transcript.slice(0, -1);
    } else {
      document.getElementById('search_patient').value = event.results[0][0].transcript;
      document.getElementById("speak_text").textContent = event.results[0][0].transcript;
    }
    search_Patient();
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


  function rowView(){
    document.getElementById("row_view").style.display = "block";
    document.getElementById("grid_view").style.display = "none";
    document.getElementsByClassName("grid_content")[0].style.backgroundColor = "transparent";
    document.getElementsByClassName("row_content")[0].style.backgroundColor = "#ffff";
    document.getElementById("grid_icon").style.color = "#898a95";
    document.getElementById("row_icon").style.color = "#4D77FF";
  }
  function gridView(){
    document.getElementById("row_view").style.display = "none";
    document.getElementById("grid_view").style.display = "block";
    document.getElementsByClassName("grid_content")[0].style.backgroundColor = "#ffff";
    document.getElementsByClassName("row_content")[0].style.backgroundColor = "transparent";
    document.getElementById("grid_icon").style.color = "#4D77FF";
    document.getElementById("row_icon").style.color = "#898a95";
  }
return(
  <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Patient <span style={{color:"#4D77FF"}}>Records</span></h1>

          <div className="schedule_top">
            <Grid
             container
             direction="row"
             justifyContent="space-between"
             alignItems="center"
            >
            <div className="left left_in_top_Patient">
              <Grid
               container
               direction="row"
               justifyContent="flex-start"
               alignItems="center"
              >
   
               <div className="search_container">
                 <div className="icon">
                   <img alt="" src={Search_Icon}/>
                 </div>
                 <input type="text" placeholder="Search here" id="search_patient" onKeyUp={search_Patient}/>
                 <div className="icon">
                   <LightTooltip title="Search by voice">
                    <img alt="" src={Mic_Icon} onClick={record} id="voice_search_icon"/>
                   </LightTooltip>
                 </div>
               </div>
            
               <div className="search_container filter_date date_range"       
                id="basic-button1"
                aria-controls={openTEST1 ? "basic-menu1" : undefined}
                aria-haspopup="true"
                aria-expanded={openTEST1 ? "true" : undefined}
                onClick={handleClick1}
               >
                <input type="text" className="filter_date" id="filter_date_value" placeholder="Filter Date" style={{textIndent:"10px"}} disabled/>
                <div className="icon" style={{borderLeft:"1.5px solid rgb(150, 150, 150)"}}>
                  <img alt="" src={Calendar_Icon}/>
                </div>
               </div>
    
               <Menu
                disableRipple
                id="basic-menu1"
                anchorEl={anchorEl_open1}
                open={openTEST1}
                onClose={handleCloseEffect1}
                MenuListProps={{"aria-labelledby": "basic-button",}}
                >
                  <MenuItem style={{visibility:"hidden"}}></MenuItem>
                  <MenuItem disableRipple>
                    <DateRangePicker
                     onChange={(item) => setState([item.selection])}
                     showSelectionPreview={true}
                     moveRangeOnFirstSelection={false}
                     months={2}
                     ranges={state}
                     direction="horizontal"
                  />
                  </MenuItem>
                  <input type="hidden" id="input_from" />
                  <input type="hidden" id="input_to" />
                  <div className="filter_btn">
                    <div className="left">
                      <span onClick={clearFilter}>Clear Filter</span>
                    </div>
                    <div className="right">
                      <span onClick={cancelFilter}>Cancel</span>
                      <span onClick={ApplyFilter}>Apply</span>
                    </div>
                  </div>
                </Menu>   

                <div className="change_view">
                    <p>View</p>
                    <div className='box'>
                      <div className='content grid_content' style={{backgroundColor:"#ffff"}}><AppsIcon fontSize='small' id="grid_icon" onClick={gridView}/></div>
                      <div className='content row_content'><MenuIcon fontSize='small' id="row_icon" onClick={rowView}/></div>
                    </div>
                </div>

              </Grid>
            </div>

            <div className="right right_in_top_Patient">
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

          <div className="all_patient_container all_vaccine_container" id="grid_view">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              id="grid_patient"
            >
                {loading ? box_patient
                :
                <div className="header_table header_body" id="table_loader" style={{backgroundColor:"transparent",boxShadow:"none"}}>
                  <div div className='no_schedule_available'>
                    <CircularProgress style={{height:"60px",width:"60px"}}/>
                    <p style={{fontSize:"1.3rem"}}>Please wait...</p>
                  </div> 
                </div>
                }
                <div div className='no_schedule_available no_schedule_available2' style={{display:"none"}}>
                  <img src={No_Records_Available} alt=""/>
                  <p style={{fontSize:"1.3rem"}}>No patient found</p>
                </div>  
            </Grid>
          </div>

        <div id="row_view" style={{display:"none"}}>
          <div className="header_table">
            <div className="header2">
                <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>Mother ID</span>
            </div>
            <div className="header3">
                <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>Name</span>
            </div>
            <div className="header4">
                <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>CONCACT</span>
            </div>
            <div className="header5">
                <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>DATE CREATED</span>
            </div>
            <div className="header6">
                <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>ACTION</span>
            </div>
          </div>

          <div className="header_table header_body" id="header_body">
          {loading ?   
            each_patient     
          :
            <div className="header_table header_body" id="table_loader" style={{backgroundColor:"transparent",boxShadow:"none"}}>
              <div div className='no_schedule_available'>
                <CircularProgress style={{height:"60px",width:"60px"}}/>
                <p style={{fontSize:"1.3rem"}}>Please wait...</p>
              </div> 
            </div>
          }
            <div div className='no_schedule_available no_schedule_available3' style={{display:"none"}}>
              <img src={No_Records_Available} alt=""/>
              <p style={{fontSize:"1.3rem"}}>No patient found</p>
            </div>  
          </div>
          
          <div className="bottom_sched">
            <p>{"Total of "+array_patient_ctr1+" records"}</p>
          </div>
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

    

  </div>
)
}


