import React from "react";

export default function Previous_Announcement(props){

//Showing all information in latest announcements
function show_latest_specific_announcements_function(){
    document.getElementsByClassName("specific_announcement_container")[0].style.display = "block";
    setTimeout(function(){
      document.getElementsByClassName("announcement_container")[0].style.marginRight = "0";
    },0);
  
    document.getElementById("specific_announcement_date").textContent = props.date;
    document.getElementById("specific_announcement_img").src = props.imageUrl;
    document.getElementById("specific_announcement_headline").textContent = props.headline;
    document.getElementById("announcement_content").textContent = props.content;
}

    return(
    <div className="box" key={props.propsKey} onClick={show_latest_specific_announcements_function}>
      <img src={props.imageUrl} alt=""/>
      <div className="content">
          <p className="headline">{props.headline}</p>
          <p className="description">{props.content_to_show}</p>
          <div className="bot">
          <p className="date">{props.date}</p>
          <p className="see_more_btn">See more &#62;&#62;</p>
          </div>
      </div>
    </div>
    )
}