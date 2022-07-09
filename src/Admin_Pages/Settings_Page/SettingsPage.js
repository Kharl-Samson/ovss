import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Settings.css";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import Search_Icon from "./Images/Search_Icon.png";
import Mic_Icon from "./Images/Mic_Icon.png";
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import AddIcon from '@mui/icons-material/Add';
import No_Records_Available from "./Images/No_Records_Available.png";
import Admin_Left_Navigation_Bar from '../Navigation_Bar/Left_Nav';
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import $ from 'jquery'; 

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import CircularProgress from '@mui/material/CircularProgress';
import speechRecog from "./Images/speechRecog.gif";
import Each_Announcement from './EachAnnouncement';
import Show_Specific_Announcement from './ShowSpecificAnnouncement';
import { useNavigate } from "react-router-dom";
import Delete_Announcement_Modal from '../../Modals/DeleteAnnouncementModal';
import SuccesSlideModal from '../../Modals/SuccesSlideModal';

export default function Admin_Settings_Page(){
  let navigate = useNavigate();
  function gotoAddAnnouncement(){
    navigate(`/Administration_Add_Announcement`);
  }

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
  document.title = "OVSS | Announcement Settings";
  
  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_Settings").style.pointerEvents="none";
    document.getElementById("left_nav_settings_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_Settings_link").style.backgroundColor = "#e7e7ff";
  }, 10);
  


   //Loading while fetching data in axios
   const [loading,setLoading] = useState(false);
   //Hook for view the list of announcements
   const [announcement, setAnnouncements] = useState([]);  
   const loadAnnouncement = async () =>{
     const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Announcements.php");
     setLoading(true);
     setAnnouncements(result.data.phpresult);
   };
   useEffect(() => {
    loadAnnouncement();
   }, []);

  var array_announcement_ctr = -1;
  const box_announcement = announcement.map((res) => {
    array_announcement_ctr++;
    var content_var_to_show ;
    var content = res.description;
    if(content.length >= 125){
      content_var_to_show = content.slice(0, 125)+"..."
      content_var_to_show = content_var_to_show.replace(/<br>/g,' ');
    }
    else{
      content_var_to_show = content;
      content_var_to_show = content_var_to_show.replace(/<br>/g,' ');
    }
      return (
        <Each_Announcement
        key = {array_announcement_ctr}
        propsKey = {array_announcement_ctr}
        id = {res.id}
        imageUrl = {localStorage.getItem("url_announcement")+res.image}
        imgurlNoLocalStorage = {res.image}
        headline = {res.title}
        content_to_show = {content_var_to_show}
        content = { content }
        date = {moment(res.date).format('LL')}
        dateNotFormat = {res.date}
        />
      );
  });

  //Form delete task
  const DeleteFormAnnouncement=(e)=>{
    e.preventDefault();
    //Sending the data request to call it on backend
    const sendData = {
      key : document.getElementById("delete_modal_announce_key").value,
    }
    document.getElementsByClassName("progress_btn_DeletesAnnounce_modal")[0].style.display = "flex";
    document.getElementsByClassName("text_btn_DeleteAnnounce_Vax")[0].style.display = "none";
    axios.post(localStorage.getItem("url_hosting")+'Delete_Announcement.php',sendData)
    .then((result)=>{
      if(result.data.status === "Success"){
        document.getElementsByClassName("progress_btn_DeletesAnnounce_modal")[0].style.display = "none";
        document.getElementsByClassName("text_btn_DeleteAnnounce_Vax")[0].style.display = "flex";
        document.getElementById("delete_announcement_modal_container").style.display = "none";
        loadAnnouncement();
        document.getElementById("slide_modal_container").style.left = "75px";
        setTimeout(function () {
          document.getElementById("slide_modal_container").style.left = "-100%";
        }, 2000);
      }
      else{
        alert("SQL error")
      }
    })    
  }
  
//Filter Search
function search_announcement(){
  var value = document.getElementById("search_announcement").value;
  value = value.toLowerCase();
  $("#grid_announcenment .box").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
  if($('#grid_announcenment .box:visible').length === 0) {//if not found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "flex";
  }
  else if($('#grid_announcenment .box:visible').length !== 0){//if found
      document.getElementsByClassName("no_schedule_available2")[0].style.display = "none";
  }
  if(document.getElementById("search_announcement").value.length === 0){
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
      document.getElementById('search_announcement').value = event.results[0][0].transcript.slice(0, -1);
      document.getElementById("speak_text").textContent = event.results[0][0].transcript.slice(0, -1);
    } else {
      document.getElementById('search_announcement').value = event.results[0][0].transcript;
      document.getElementById("speak_text").textContent = event.results[0][0].transcript;
    }
    search_announcement();
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
          <h1>Announcement <span style={{color:"#4D77FF"}}>Settings</span></h1>

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
                    <input type="text" placeholder="Search here" id="search_announcement" onKeyUp={search_announcement}/>
                    <div className="icon">
                      <LightTooltip title="Search by voice">
                        <img alt="" src={Mic_Icon} onClick={record} id="voice_search_icon"/>
                      </LightTooltip>
                    </div>
                  </div>    
                </Grid>
              </div>

              <div className="right">
                <LightTooltip title="Add announcement">
                <div className="search_container" style={{width:"auto"}} onClick={gotoAddAnnouncement}>
                  <div className="icon" style={{borderRight:"1.5px solid rgb(150, 150, 150)"}}>
                    <AddIcon sx={{color:"#4D77FF"}}/>
                  </div>
                  <span style={{color:"#4D77FF"}}>New Announcement</span>
                </div>
                </LightTooltip>
              </div>
            </Grid>
          </div>

          <div className="all_announcenment_container">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              id="grid_announcenment"
            >

            {loading ?   
              box_announcement   
            :
            <div className="header_table header_body" id="table_loader" style={{backgroundColor:"transparent",boxShadow:"none"}}>
              <div div className='no_schedule_available'>
                <CircularProgress style={{height:"60px",width:"60px"}}/>
              </div> 
            </div>
            }
                <div div className='no_schedule_available no_schedule_available2' style={{display:"none"}}>
                  <img src={No_Records_Available} alt=""/>
                  <p style={{fontSize:"1.3rem"}}>No announcement found</p>
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
      {/*SHOW SPECIFIC ANNOUNCEMENT MODAL */}
      <Show_Specific_Announcement/>
      {/*DELETE ANNOUNCEMENT MODAL */}
      <Delete_Announcement_Modal
        title = "Delete this announcement?"
        description = "If you delete this announcement it will be gone forever. Are you sure you want to proceed?"
        formAction = {DeleteFormAnnouncement}
      />
      {/*Success slide modal*/}
      <SuccesSlideModal/>

  </div>
)
}


