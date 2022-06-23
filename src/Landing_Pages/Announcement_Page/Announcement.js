import React from "react";
import "./Announcements.css";
import Grid from '@mui/material/Grid';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import Navigation_Bar from "../Navigation_Bar/NavigationBar";
import Url_Announcement from "../../Functions/Url_Announcement";

import moment from 'moment';
import Each_Latest_Announcement from "./EachLatestAnnouncement";
import Each_Latest_Announcement_Maximize from "./EachLatestAnnouncementMaximize";
import Show_Specific_Announcement from "./ShowSpecificAnnouncement";

export default function AnnouncementPage(){

  //Calling the url of announcement
  Url_Announcement();

  //Loading the logo and the title on the Tab of the browser
  document.querySelector("link[rel='shortcut icon']").href = TabLogo;
  document.title = "OVSS | Announcements";

  //Setting the color of active navigation text
  setTimeout(function () {
    document.getElementById("announcement_span_nav").style.color = "#4D77FF";
  }, 10);


  //Temporary Array
  const array_announcement = ["1", "2", "3", "4", "5", "6"];
  var array_announcement_ctr = -1;
  const box_announcement = array_announcement.map((res) => {
    array_announcement_ctr++;

    var content_var_to_show ;

    var content = "CITY OF MALOLOS, Bulacan––The number of active COVID-19 cases in Bulacan province dropped to 35 as of Tuesday, June 7, as several localities continued to register zero new infections in the past week, local health data showed. The Provincial Health Office said 34 of the active COVID-19 cases were in home isolation. The remaining one was taken to a quarantine facility. The active infections were in the towns of Angat (3), Bocaue (1), Calumpit (4), Guiguinto (1), Hagonoy (8), Marilao (2), Pandi (1), and Plaridel (1) and the cities of Malolos (7) and San Jose Del Monte (7). Data also showed that 13 other towns and a city remained free of COVID-19. Last week, the province’s active cases rose to 62."

    if(content.length >= 223){
      content_var_to_show = content.slice(0, 223)+"..."
    }

    if(array_announcement_ctr < 3){

      return (
        <Each_Latest_Announcement
          propsKey = {array_announcement_ctr}
          headline = {"Latest Announcement no. "+ array_announcement_ctr}
          content_to_show = {content_var_to_show}
          content = { content }
          date = {"June 23, 2022"}
        />
      );
    }
    else{
      return (
        <Each_Latest_Announcement_Maximize
          propsKey = {array_announcement_ctr}
          headline = {"Title "+ array_announcement_ctr}
          content_to_show = {content_var_to_show}
          content = { content }
          date = {"June 23, 2022"}
        />
      );
    }
  });

//Show all latest announcements function
function show_all_latest_announcements(){
  for(var i = 3 ; i < array_announcement.length ; i++){
      document.getElementsByClassName("box_Announcement_ctr"+i)[0].style.display = "block";
  }
  document.getElementById("hide_announcement_btn").style.display = "block"
  document.getElementById("view_all_announcement_btn").style.display = "none"
}
//Minimize latest announcements function
function Minimize_latest_announcements(){
  var len = array_announcement.length-1;
  for(var i = len ; i > 2 ; i--){
      document.getElementsByClassName("box_Announcement_ctr"+i)[0].style.display = "none";
  }
  document.getElementById("hide_announcement_btn").style.display = "none"
  document.getElementById("view_all_announcement_btn").style.display = "block"
}

  //Temporary Array
  const array_previous_announcement = ["1", "2", "3", "4", "5", "6"];
  var array_previous_announcement_ctr = -1;
  const box_previous_announcement = array_previous_announcement.map((res) => {
    array_previous_announcement_ctr++;
    if(array_previous_announcement_ctr < 9){
      return (
      <div className="box" key={array_previous_announcement_ctr}>
        <img src={localStorage.getItem("url_announcement")+"announcements_template1.png"} alt=""/>
        <div className="content">
          <p className="headline">Nearly 71M Pinoys fully vaxxed vs. Covid-19</p>
          <p className="description">The Philippines has fully vaccinated a total of 70,917,708 Filipinos against...</p>
          <div className="bot">
            <p className="date">{moment().format('LL')}</p>
            <p className="see_more_btn">See more &#62;&#62;</p>
          </div>
        </div>
      </div>
      );
    }
  });


return(
  <div>
    <Navigation_Bar/>
    <div className="latest_announcement_container">
        <h1>Latest <span>Announcements</span></h1>
        <p className="Latest_announcement_date">{moment().format('LL')}</p>
        <div className="box_container">
        <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
        >
            {box_announcement}
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
            {box_previous_announcement}
        </Grid>
        </div>
      </div>
    </div>

    {/*Specific Announcement Container */}
    <Show_Specific_Announcement/>

  </div>
)
}