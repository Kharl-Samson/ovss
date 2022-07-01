import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../Schedule.css";
import Admin_Left_Navigation_Bar from "../../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from "../../Navigation_Bar/Right_Nav";
import TabLogo from "../../../Assets/Logo/Tab_Logo.png";
import Search_Icon from "../Images/Search_Icon.png";
import Mic_Icon from "../Images/Mic_Icon.png";
import Calendar_Icon from "../Images/Calendar_Icon.png";
import Report_Icon from "../Images/Report_Icon.png";
import Grid from '@mui/material/Grid';
import No_Records_Available from "../Images/No_Records_Available.png";

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import $ from 'jquery'; 

import CircularProgress from '@mui/material/CircularProgress';
import SuccesSlideModal from '../../../Modals/SuccesSlideModal';
import ViewScheduleInfo from './ViewScheduleInfo';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import EachAllRow from './EachAllRow';
import speechRecog from "../Images/speechRecog.gif";


export default function Admin_History_Schedule_Page(){

  
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
  document.title = "OVSS | Schedule";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_history_sched").style.pointerEvents="none";
    document.getElementById("admin_history_schedule_link").style.backgroundColor = "#FFF7DB";
    document.getElementById("left_nav_history_sched_border").style.borderLeft = "5px solid #E2AB1D";
    document.getElementById("left_nav_sched_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_schedule_link").style.backgroundColor = "#e7e7ff";
  }, 10);



   //Hook for view the list of task of user
   const [appointments, setAppoointments] = useState([]);  
   const loadAppointment = async () =>{
       const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Appointments.php");
       setAppoointments(result.data.phpresult);
   };
   useEffect(() => {
      loadAppointment();
   }, []);
 

  var array_history_schedule_ctr = 0;
  const box_history_schedule = appointments.map((res) => {
      array_history_schedule_ctr++;
      var bg_color = "", color = "";
      if(res.appointment_status === "Pending"){
        bg_color = "#f8edc3"
        color = "#E2AB1D"
      }
      else if(res.appointment_status === "Approved"){
        bg_color = "#C1FFCF"
        color = "#0DC939"
      }
      else if(res.appointment_status === "Rejected"){
        bg_color = "#FCC4C7"
        color = "#EC4C4C"
      }
      return (
        <EachAllRow
        key={array_history_schedule_ctr}
        propsKey = {array_history_schedule_ctr}
        id = {res.id}
        email = {res.email}
        motherID = {res.mother_id}
        motherFname = {res.mother_fname}
        motherMname = {res.mother_mname}
        motherLname = {res.mother_lname}
        purok = {res.purok}
        barangay = {res.barangay}
        municipality = {res.municipality}
        province = {res.province}
        appointmentDate = {res.appointment_date}
        contact = {res.contact}
        appointmentStatus = {res.appointment_status}
        child_fname = {res.child_fname}
        child_mname = {res.child_mname}          
        child_lname = {res.child_lname}
        child_bdate = {res.child_bdate}
        child_age = {res.child_age}
        child_sex = {res.child_sex}
        child_weight = {res.child_weight}
        child_placeDelivery = {res.child_placeDelivery}
        child_vaccineName = {res.child_vaccineName}
        child_vaccineDate = {res.child_vaccineDate}
        child_vaccineDose = {res.child_vaccineDose}
        bg_color = {bg_color}
        color = {color}
        />
      ); 
  });


//Filter Search
function search_Schedule(){
  var value = document.getElementById("search_all_schedule").value;
  value = value.toLowerCase();
  $("#header_body .table_tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
  if($('#header_body .table_tr:visible').length === 0) {//if not found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "flex";
  }
  else if($('#header_body .table_tr:visible').length !== 0){//if found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
  if(document.getElementById("search_all_schedule").value.length === 0){
    document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
}
    
  //Page loader
  setTimeout(function () {
    document.getElementById("header_body").style.display ="flex";
    document.getElementById("table_loader").style.display ="none";
  }, 500);


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

    var div = document.getElementsByClassName("each_Table");  
    for (var i = 0; i < div.length; i++) {
      div[i].style.display = "flex";
    }
    document.getElementsByClassName("no_schedule_available2")[0].style.display ="none";
    document.getElementById("search_all_schedule").value = "";
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
    document.getElementById("search_all_schedule").value = "";
    document.getElementById("basic-menu1").style.display = "none";
    var div = document.getElementsByClassName("each_Table");  
      if (document.getElementById("input_from").value !== "" && document.getElementById("input_to").value !== "") {
        for (var i = 0; i < div.length; i++) {
          var key = document.getElementsByClassName("all_Date")[i].textContent;
          if (key) {
            if ( key >= document.getElementById("input_from").value && key <= document.getElementById("input_to").value) {
              div[i].style.display = "flex";
            } else {
              div[i].style.display = "none";
            }
          }
          if ($("#header_body #each_Table:visible").length === 0) {
            document.getElementsByClassName("no_schedule_available2")[0].style.display ="flex";
          }
          else if ($("#header_body #each_Table:visible").length != 0) {
            document.getElementsByClassName("no_schedule_available2")[0].style.display ="none";
          }
        }
      }
    
  }

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
        document.getElementById('search_all_schedule').value = event.results[0][0].transcript.slice(0, -1);
        document.getElementById("speak_text").textContent = event.results[0][0].transcript.slice(0, -1);
      } else {
        document.getElementById('search_all_schedule').value = event.results[0][0].transcript;
        document.getElementById("speak_text").textContent = event.results[0][0].transcript;
      }
      search_Schedule();

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

    return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">
                <h1>Schedule <span style={{color:"#4D77FF"}}>History</span></h1>

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
                      {array_history_schedule_ctr === 0 ?
                       "" 
                       :   
                      <div className="search_container">
                        <div className="icon">
                          <img alt="" src={Search_Icon}/>
                        </div>
                        <input type="text" placeholder="Search here" id="search_all_schedule" onKeyUp={search_Schedule}/>
                        <div className="icon">
                          <LightTooltip title="Search by voice">
                            <img alt="" src={Mic_Icon} onClick={record}/>
                          </LightTooltip>
                        </div>
                      </div>
                      }
              
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
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
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

                <div className="header_table">
                  <div className="header2">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>DATE RECEIVED</span>
                  </div>
                  <div className="header3">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>REQUESTED BY</span>
                  </div>
                  <div className="header4">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>CONCACT</span>
                  </div>
                  <div className="header5">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>STATUS</span>
                  </div>
                  <div className="header6">
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>ACTION</span>
                  </div>
                </div>

                <div className="header_table header_body" id="table_loader">
                    <div div className='no_schedule_available'>
                      <CircularProgress style={{height:"60px",width:"60px"}}/>
                      <p style={{fontSize:"1.3rem"}}>Please wait...</p>
                    </div> 
                </div>

                <div className="header_table header_body" id="header_body" style={{display:"none"}}>
                    {array_history_schedule_ctr === 0 ?
                    <div className='no_schedule_available no_schedule_available1'>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No schedule available</p>
                    </div>  :   box_history_schedule
                   } 

                    <div div className='no_schedule_available no_schedule_available2' style={{display:"none"}}>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No schedule found</p>
                    </div>
                </div>

                <div className="bottom_sched">
                   <p>{"Total of "+array_history_schedule_ctr+" schedules"}</p>
                   <div className="btn">
                        <button>Reject</button>
                        <button>Accept</button>
                   </div>
                </div>

            </div>
        </div>
            
    <Admin_Right_Navigation_Bar/>
    </div>

        {/*View schedule modal*/}
        <ViewScheduleInfo/>
        {/*Success slide modal*/}
        <SuccesSlideModal/>
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


