import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Announcements.css";
import Grid from '@mui/material/Grid';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Navigation_Bar from "../Navigation_Bar/NavigationBar";
import moment from 'moment';
import Each_Latest_Announcement from "./EachLatestAnnouncement";
import Each_Latest_Announcement_Maximize from "./EachLatestAnnouncementMaximize";
import Show_Specific_Announcement from "./ShowSpecificAnnouncement";
import Previous_Announcement from "./PreviousAnnouncement";
import Footer from "../Footer/Footer";
import CircularProgress from '@mui/material/CircularProgress';

export default function AnnouncementPage(){

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Announcements";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("announcement_span_nav").style.color = "#4D77FF";
    document.getElementById("landing_page_navigation").style.backgroundColor = "#FFFF";
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

    if(array_announcement_ctr < 3){
      return (
        <Each_Latest_Announcement
          propsKey = {array_announcement_ctr}
          imageUrl = {localStorage.getItem("url_announcement")+res.image}
          headline = {res.title}
          content_to_show = {content_var_to_show}
          content = { content }
          date = {moment(res.date).format('ll')}
        />
      );
    }
    else{
      return (
        <Each_Latest_Announcement_Maximize
          propsKey = {array_announcement_ctr}
          imageUrl = {localStorage.getItem("url_announcement")+res.image}
          headline = {res.title}
          content_to_show = {content_var_to_show}
          content = { content }
          date = {moment(res.date).format('ll')}
        />
      );
    }
  });

//Show all latest announcements function
function show_all_latest_announcements(){
  for(var i = 3 ; i < announcement.length ; i++){
      document.getElementsByClassName("box_Announcement_ctr"+i)[0].style.display = "block";
  }
  document.getElementById("hide_announcement_btn").style.display = "block"
  document.getElementById("view_all_announcement_btn").style.display = "none"
}
//Minimize latest announcements function
function Minimize_latest_announcements(){
  var len = announcement.length-1;
  for(var i = len ; i > 2 ; i--){
      document.getElementsByClassName("box_Announcement_ctr"+i)[0].style.display = "none";
  }
  document.getElementById("hide_announcement_btn").style.display = "none"
  document.getElementById("view_all_announcement_btn").style.display = "block"
}

  var array_previous_announcement_ctr = -1;
  const box_previous_announcement = announcement.map((res) => {
    array_previous_announcement_ctr++;
    var content_var_to_show ;
    var content_prev = res.description;
    if(content_prev.length >= 80){
      content_var_to_show = content_prev.slice(0, 80)+"..."
      content_var_to_show = content_var_to_show.replace(/<br>/g,' ');
    }
    else{
      content_var_to_show = content_prev;
      content_var_to_show = content_var_to_show.replace(/<br>/g,' ');
    }
    if(array_previous_announcement_ctr > 2 &&  array_previous_announcement_ctr < 9){
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


return(
  <div>
    <Navigation_Bar/>
    <div className="latest_announcement_container">
        <h1>Latest <span>Announcements</span></h1>
        <p className="Latest_announcement_date">{moment().format('ll')}</p>
        <div className="box_container">
        <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
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
        </Grid>

        <p className="view_all_announcement_btn" id="view_all_announcement_btn" onClick={show_all_latest_announcements}>View all</p>
        <p className="view_all_announcement_btn" id="hide_announcement_btn" style={{display:"none"}} onClick={Minimize_latest_announcements}>Minimize</p>      
        </div>
    </div>

    <div className="previous_announcement_container">
      <div className="box_container">
        <h1>Previous <span>Announcements</span></h1>

        <div className="container_box">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
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

      {/*Footer */}
      <Footer/>

    </div>

    {/*Specific Announcement Container */}
    <Show_Specific_Announcement/>



  </div>
)
}