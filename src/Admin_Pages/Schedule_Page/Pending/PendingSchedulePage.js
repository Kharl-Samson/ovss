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
import EachPendingRow from "./EachPendingRow";
import $ from 'jquery'; 
import Reject_Modal from '../../../Modals/RejectModal';

import CircularProgress from '@mui/material/CircularProgress';
import SuccesSlideModal from '../../../Modals/SuccesSlideModal';
import Accept_Modal from '../../../Modals/AcceptModal';
import ViewScheduleInfo from './ViewScheduleInfo';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import speechRecog from "../Images/speechRecog.gif";

export default function Admin_Pending_Schedule_Page(){

  
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
    document.getElementById("link_pending_sched").style.pointerEvents="none";
    document.getElementById("admin_pending_schedule_link").style.backgroundColor = "#e7e7ff";
    document.getElementById("left_nav_pending_sched_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("left_nav_sched_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_schedule_link").style.backgroundColor = "#e7e7ff";
  }, 10);


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
 

  var array_pending_schedule_ctr = 0;
  const box_pending_schedule = appointments.map((res) => {
      if(res.appointment_status === "Pending"){
      array_pending_schedule_ctr++;
      return (
        <EachPendingRow
          key={array_pending_schedule_ctr}
          propsKey = {array_pending_schedule_ctr}
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
        />
      ); 
    }
  });


//Filter Search
function search_Schedule(){
  var value = document.getElementById("search_pending_schedule").value;
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
  if(document.getElementById("search_pending_schedule").value.length === 0){
    document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
}
    

  //Form Reject Schedule
  const RejectScheduleForm=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
        key : document.getElementById("reject_schedule_modal_key").value,
        emailTo : document.getElementById("email_reject_key").value,
        name : document.getElementById("name_reject_key").value,
        date : document.getElementById("date_reject_key").value,   
    }
    document.getElementsByClassName("text_btn_sched_Vax")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_schedule_modal")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+'Reject_Schedule.php',sendData)
    .then((result)=>{
        if(result.data.status === "Success"){
          document.getElementById("reject_sched_modal_container").style.display = "none";
          loadAppointment();
          document.getElementById("slide_modal_container").style.left = "75px";
          setTimeout(function () {
            document.getElementById("slide_modal_container").style.left = "-100%";
          }, 2000);
          document.getElementsByClassName("text_btn_sched_Vax")[0].style.display = "flex";
          document.getElementsByClassName("progress_btn_schedule_modal")[0].style.display = "none";
        }
        else{
          alert("SQL error")
        }
    })
    //Axios for mailer
    axios.post(localStorage.getItem("url_hosting")+'Reject_Schedule_Mailer.php',sendData).then((result)=>{})
  }

  //Form Accept Schedule
  const AccpetScheduleForm=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
      key : document.getElementById("accept_modal_key").value,
      emailTo : document.getElementById("email_accept_key").value,
      name : document.getElementById("name_accept_key").value,
      date : document.getElementById("date_accept_key").value,   
    }
    document.getElementsByClassName("text_btn_Acceptsched_Vax")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_schedule_modal")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+'Accept_Schedule.php',sendData)
    .then((result)=>{
      if(result.data.status === "Success"){
        document.getElementById("Accept_sched_modal_container").style.display = "none";
        loadAppointment();
        document.getElementById("slide_modal_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("slide_modal_container").style.left = "-100%";
        }, 2000);
        document.getElementsByClassName("text_btn_Acceptsched_Vax")[0].style.display = "flex";
        document.getElementsByClassName("progress_btn_schedule_modal")[0].style.display = "none";
      }
      else{
        alert("SQL error")
      }
    })
    //Axios for mailer
    axios.post(localStorage.getItem("url_hosting")+'Accept_Schedule_Mailer.php',sendData).then((result)=>{})
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

    var div = document.getElementsByClassName("each_Table");  
    for (var i = 0; i < div.length; i++) {
      div[i].style.display = "flex";
    }
    document.getElementsByClassName("no_schedule_available2")[0].style.display ="none";
    document.getElementById("search_pending_schedule").value = "";
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
    document.getElementById("search_pending_schedule").value = "";
    document.getElementById("basic-menu1").style.display = "none";
    var div = document.getElementsByClassName("each_Table");  
      if (document.getElementById("input_from").value !== "" && document.getElementById("input_to").value !== "") {
        for (var i = 0; i < div.length; i++) {
          var key = document.getElementsByClassName("pending_Date")[i].textContent;
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
        document.getElementById('search_pending_schedule').value = event.results[0][0].transcript.slice(0, -1);
        document.getElementById("speak_text").textContent = event.results[0][0].transcript.slice(0, -1);
      } else {
        document.getElementById('search_pending_schedule').value = event.results[0][0].transcript;
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
                <h1>Pending <span style={{color:"#4D77FF"}}>Schedules</span></h1>

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
                      {array_pending_schedule_ctr === 0 ?
                       "" 
                       :   
                      <div className="search_container">
                        <div className="icon">
                          <img alt="" src={Search_Icon}/>
                        </div>
                        <input type="text" placeholder="Search here" id="search_pending_schedule" onKeyUp={search_Schedule}/>
                        <div className="icon">
                          <LightTooltip title="Search by voice">
                            <img alt="" src={Mic_Icon} onClick={record} id="voice_search_icon"/>
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
                      <span className="header_span" style={{fontWeight:"700",textAlign:"center"}}>ACTIONS</span>
                  </div>
                </div>

                {loading ?
                <div className="header_table header_body" id="header_body">
                    {array_pending_schedule_ctr === 0 ?
                    <div className='no_schedule_available no_schedule_available1'>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No schedule available</p>
                    </div>  :   box_pending_schedule
                   } 

                    <div className='no_schedule_available no_schedule_available2' style={{display:"none"}}>
                      <img src={No_Records_Available} alt=""/>
                      <p style={{fontSize:"1.3rem"}}>No schedule found</p>
                    </div>
                </div>
                :
                <div className="header_table header_body" id="table_loader">
                  <div div className='no_schedule_available'>
                    <CircularProgress style={{height:"60px",width:"60px"}}/>
                    <p style={{fontSize:"1.3rem"}}>Please wait...</p>
                  </div> 
                </div>
                }

                <div className="bottom_sched">
                   <p>{"Total of "+array_pending_schedule_ctr+" pending schedules"}</p>
                   <div className="btn">
                        <button>Reject</button>
                        <button>Accept</button>
                   </div>
                </div>

            </div>
        </div>
            
    <Admin_Right_Navigation_Bar/>
    </div>

        {/*Reject appointment container */}
        <Reject_Modal
          title = "Reject this appointment?"
          description = "If you reject this appointment it will be gone forever. Are you sure you want to proceed?"
          formAction = {RejectScheduleForm}
        />
        {/*Accept appointment container */}
        <Accept_Modal
           title = "Accept this appointment?"
           description = "If you accpet this appointment an email will send to the patient. Are you sure you want to proceed?"
           formAction = {AccpetScheduleForm}
           button = "Accept"
        />
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


