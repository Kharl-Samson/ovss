import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./dashboard.css";
import moment from 'moment';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Patient_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Patient_Right_Navigation_Bar from "../Navigation_Bar/Right_Nav";
import Top_part from "./TopPart";
import slider1 from "../../Assets/Dashboard_Page/slider1.png";
import slider2 from "../../Assets/Dashboard_Page/slider2.png";
import slider3 from "../../Assets/Dashboard_Page/slider3.png";
import Previous_Announcement from './PreviousAnnouncement';
import Show_Specific_Announcement from './ShowSpecificAnnouncement';

export default function PatientDashboard_Page(){

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Dashboard";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("link_dashboard").style.pointerEvents="none";
    document.getElementById("left_nav_dashboard_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_dashboard_link").style.backgroundColor = "#e7e7ff";
  }, 10);

  //Image slider autoplay function
  var myIndex = 0;
  function carousel() {
    var i;
    var x = document.getElementsByClassName("slider");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "flex";  
    setTimeout(carousel, 5000); // Change image every 5 seconds
  }

  setTimeout(function(){
    carousel();
  },10);


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
  var array_previous_announcement_ctr = -1;
  const box_previous_announcement = announcement.map((res) => {
    array_previous_announcement_ctr++;
    var content_var_to_show ;
    var content_prev = res.description;
    if(content_prev.length >= 280){
      content_var_to_show = content_prev.slice(0, 280)+"..."
      content_var_to_show = content_var_to_show.replace(/<br>/g,' ');
    }
    else{
      content_var_to_show = content_prev;
      content_var_to_show = content_var_to_show.replace(/<br>/g,' ');
    }
    if(array_previous_announcement_ctr < 8){
      return (
        <Previous_Announcement
        propsKey = {array_previous_announcement_ctr}
        imageUrl = {localStorage.getItem("url_announcement")+res.image}
        headline = {res.title}
        content_to_show = {content_var_to_show}
        content = { content_prev }
        date = {moment(res.date).format('ll')}
        />
      );
    }
  });

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


return(
<div className="admin_dashboard_container">
    <Patient_Left_Navigation_Bar/>

    <div className="admin_content">
        <div className="admin_main_content">
            <div className="container">

              <Top_part/>

              <div className="banner">
                <div className="slider slider1"     
                style={{
                  display:"none",
                  backgroundImage: `url(${slider1})`
                }}>
                    <p>Polio Immunization<br/>for Bulakenyo Kids</p>
                    <div className="dot">
                        <div className="circle" style={{backgroundColor:"#4D77FF"}}></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className="slider slider2"     
                style={{
                  display:"none",
                  backgroundImage: `url(${slider2})`
                }}>
                    <p>A Shot for Love: Child<br/>Immunuzation for Protection</p>
                    <div className="dot">
                        <div className="circle"></div>
                        <div className="circle" style={{backgroundColor:"#4D77FF"}}></div>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className="slider slider3"     
                style={{
                  backgroundImage: `url(${slider3})`
                }}>
                    <p>Routine Immunization for<br/>Children in the Philippines</p>
                    <div className="dot">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle" style={{backgroundColor:"#4D77FF"}}></div>
                    </div>
                </div>
              </div>

              <h1 className="prev_ann">Previous <span style={{color:"#4D77FF"}}>Announcements</span></h1>

              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                id="prev_ann_container"
              >
              {loading ?   
                box_previous_announcement   
              :
              <div className="header_table header_body" id="table_loader" style={{backgroundColor:"transparent",boxShadow:"none"}}>
                <div className='no_schedule_available'>
                  <CircularProgress style={{height:"60px",width:"60px"}}/>
                </div> 
              </div>
              }
              </Grid>

            </div>
        </div>
            
        <Patient_Right_Navigation_Bar/>
    </div>

        {/*Specific Announcement Container */}
        <Show_Specific_Announcement/>
</div>
)
}